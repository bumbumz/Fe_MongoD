// import { useEffect } from 'react';
// import { createChat } from '@n8n/chat';
// import '@n8n/chat/style.css';

// interface ChatWidgetProps {
//   isDarkMode: boolean;
// }

// const ChatWidget: React.FC<ChatWidgetProps> = ({ isDarkMode }) => {
//   useEffect(() => {
//     createChat({
//       webhookUrl:
//         'https://ad5244.n8nvps.site/webhook/eabb20f8-5e85-47e0-b472-1365852a888e/chat',
//       webhookConfig: {
//         method: 'POST',
//         headers: {},
//       },
//       target: '#n8n-chat',
//       mode: 'window',
//       chatInputKey: 'chatInput',
//       chatSessionKey: 'sessionId',
//       loadPreviousSession: true,
//       showWelcomeScreen: false,
//       defaultLanguage: 'en',
//       initialMessages: ['Xin chào! Hôm nay tôi có thể giúp gì cho bạn?'],
//       metadata: {},
//       theme: isDarkMode ? 'dark' : 'light',
//     });
//   }, [isDarkMode]);

//   return (
//     <div
//       id="n8n-chat"
//       style={{
//         position: 'fixed',
//         bottom: '20px',
//         right: '20px',
//         zIndex: 1000,
//         width: '400px',
//         height: '600px',
//         maxHeight: '80vh',
//       }}
//     />
//   );
// };

// export default ChatWidget;
import { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';
import styles from '../../styles/ChatWidget.module.css';

interface ChatWidgetProps {
  isDarkMode: boolean;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isDarkMode }) => {
  useEffect(() => {
    createChat({
      webhookUrl:
        'https://ad5244.n8nvps.site/webhook/eabb20f8-5e85-47e0-b472-1365852a888e/chat',
      webhookConfig: {
        method: 'POST',
        headers: {},
      },
      target: '#n8n-chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: ['Xin chào! Hôm nay bạn muốn uống gì nào ❤️ '],
      metadata: {},
      theme: isDarkMode ? 'dark' : 'light',
      i18n: {
        en: {
          title: 'Chat Katinat',
          subtitle: '',
          footer: '',
          getStarted: 'Cuộc trò chuyện mới',
          inputPlaceholder: 'Nhập câu hỏi của bạn..',
          closeButtonTooltip: 'Đóng', // Thêm thuộc tính này để khắc phục lỗi
        },
      },
    });
  }, [isDarkMode]);

  return (
    <div
      id="n8n-chat"
      className={styles.chatContainer}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        width: '400px',
        height: '600px',
        maxHeight: '80vh',
      }}
    />
  );
};

export default ChatWidget;
