import type { AppContext } from 'vue'
import type { MessageConfig, ModalConfig, NotificationConfig } from '@arco-design/web-vue'
import { Message, Modal, Notification } from '@arco-design/web-vue'
import '@arco-design/web-vue/es/message/style'
import '@arco-design/web-vue/es/modal/style'
import '@arco-design/web-vue/es/notification/style'
import i18n from '@/locale'

/**
 * 设置 Vue Context
 * @param appContext
 */
export function setContext(appContext: AppContext) {
  Message._context = appContext
  Modal._context = appContext
  Notification._context = appContext
}

export default function useMessage() {
  // @ts-expect-error Type instantiation is excessively deep and possibly infinite.
  const { t } = i18n.global

  function createMessage(type: 'normal' | 'info' | 'success' | 'warning' | 'error' | 'loading') {
    return (content: string, config?: Omit<MessageConfig, 'content'>) => Message[type]({
      content,
      closable: true,
      resetOnHover: true,
      ...config,
    })
  }

  function createNotice(type: 'info' | 'success' | 'warning' | 'error') {
    return (content: string, config?: Omit<NotificationConfig, 'content'>) => Notification[type]({
      content,
      title: t('common.notice'),
      closable: true,
      ...config,
    })
  }

  function createAlert(type: 'info' | 'success' | 'warning' | 'error') {
    return (content: string, closable = true, config?: Omit<ModalConfig, 'content' | 'closable' | 'maskClosable' | 'escToClose'>) => Modal[type]({
      content,
      title: t('common.tip'),
      closable,
      maskClosable: closable,
      escToClose: closable,
      draggable: true,
      ...config,
    })
  }

  function createConfirm() {
    return (content: string, config?: Omit<ModalConfig, 'content'>) => Modal.confirm({
      title: t('common.tip'),
      content,
      maskClosable: false,
      draggable: true,
      ...config,
    })
  }

  return {
    normal: createMessage('normal'),
    info: createMessage('info'),
    success: createMessage('success'),
    warning: createMessage('warning'),
    error: createMessage('error'),
    loading: createMessage('loading'),

    infoNotice: createNotice('info'),
    successNotice: createNotice('success'),
    warningNotice: createNotice('warning'),
    errorNotice: createNotice('error'),

    infoAlert: createAlert('info'),
    successAlert: createAlert('success'),
    warningAlert: createAlert('warning'),
    errorAlert: createAlert('error'),

    confirm: createConfirm(),
  }
}
