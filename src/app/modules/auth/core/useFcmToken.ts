// // src/hooks/useFcmToken.ts
// import { useEffect } from 'react';
// import { messaging } from './firebase';
// import { getToken } from 'firebase/messaging';

// const getDeviceOS = (): string => {
//   const userAgent = navigator.userAgent || navigator.vendor;

//   if (/windows phone/i.test(userAgent)) return 'Windows Phone';
//   if (/android/i.test(userAgent)) return 'Android';
//   if (/iPad|iPhone|iPod/.test(userAgent)) return 'iOS';

//   return 'unknown';
// };

// const useFcmToken = (): void => {
//   useEffect(() => {
//     const requestPermission = async (): Promise<void> => {
//       console.log('Requesting notification permission...');
//       const permission = await Notification.requestPermission();
//       if (permission === 'granted') {
//         console.log('Notification permission granted.');
//         const requestFcmToken = async (): Promise<void> => {
//           try {
//             const token = await getToken(messaging);
//             if (token) {
//               console.log('FCM Token:', token);
//               localStorage.setItem('FCMToken', token);
//             } else {
//               console.log('No registration token available. Request permission to generate one.');
//             }
//           } catch (error) {
//             console.error('An error occurred while retrieving token.', error);
//           }
//         };
//         requestFcmToken();
//       } else {
//         console.log('Unable to get permission to notify.');
//       }
//     };

//     const deviceOs = getDeviceOS();
//     localStorage.setItem('currentPlatform', deviceOs);

//     requestPermission();
//   }, []);
// };

// export default useFcmToken;
