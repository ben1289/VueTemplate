import '@amap/amap-jsapi-types'
import AMapLoader from '@amap/amap-jsapi-loader'
import mapMarkerSvg from '@/assets/images/map-marker.svg'

export interface PointInfo {
  coordinate: [number, number] | []
  address: string
  districtCode: string
}

export default function useAMap() {
  let aMap: any = null
  let map: any = null
  let marker: any = null
  let geocoder: any = null
  let autoComplete: any = null
  const pointInfo = ref<PointInfo>({
    coordinate: [],
    address: '',
    districtCode: '',
  })

  async function initMap(container: string | HTMLDivElement) {
    aMap = await AMapLoader.load({
      key: import.meta.env.VITE_AMAP_KEY,
      version: '2.0',
      plugins: ['AMap.Geocoder', 'AMap.AutoComplete'],
    })

    map = new aMap.Map(container)
    map.on('click', (e: any) => {
      const lon = e.lnglat.getLng()
      const lat = e.lnglat.getLat()
      setMarker(lon, lat)
      geocoder.getAddress([lon, lat], (status: string, result: any) => {
        if (status === 'complete' && result.regeocode) {
          const { formattedAddress, addressComponent } = result.regeocode
          pointInfo.value = {
            coordinate: [lon, lat],
            address: formattedAddress,
            districtCode: addressComponent.adcode,
          }
        }
      })
    })

    marker = new aMap.Marker({
      icon: new aMap.Icon({
        size: new aMap.Size(32, 32),
        image: mapMarkerSvg,
      }),
      offset: new aMap.Pixel(-16, -32),
    })

    geocoder = new aMap.Geocoder()

    autoComplete = new aMap.AutoComplete()
  }

  function setMarker(lon: number, lat: number) {
    marker.setPosition([lon, lat])
    map.add(marker)
    map.setCenter(new aMap.LngLat(lon, lat))
  }

  function removeMarker() {
    map.remove(marker)
  }

  function getLocation(address: string, setPointInfo = true) {
    geocoder.getLocation(address, (status: string, result: any) => {
      if (status === 'complete' && result.geocodes.length) {
        const { location, formattedAddress, adcode } = result.geocodes[0]
        setMarker(location.lng, location.lat)
        if (setPointInfo) {
          pointInfo.value = {
            coordinate: [location.lng, location.lat],
            address: formattedAddress,
            districtCode: adcode,
          }
        }
      }
    })
  }

  function getAutoComplete(keyword: string): Promise<string[]> {
    return new Promise((resolve) => {
      autoComplete.search(keyword, (status: string, result: any) => {
        if (status === 'complete' && result.tips.length) {
          resolve(result.tips.map((tip: any) => tip.name))
        } else {
          resolve([])
        }
      })
    })
  }

  onUnmounted(() => {
    map?.destroy()
  })

  return {
    initMap,
    setMarker,
    removeMarker,
    getLocation,
    getAutoComplete,
    pointInfo,
  }
}
