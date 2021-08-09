// import React, { useEffect, useState } from "react";
// import { Text, View } from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
// const Scanner = () => {
//
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);
//   const [text, setText] = useState('not scanned yet');
//
//   const askForCameraPermission = () => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission((status == 'granted'));
//     })()
//   }
//
//   useEffect(() => {
//     askForCameraPermission()
//   }, []);
//
//   const handleBarCodeScanned = ({type, data}) => {
//     setScanned(true);
//     setText(data);
//     console.log('Type: ' + type + '\nData: ' + data);
//   }
//
//   if (hasPermission === null) {
//     return (
//       <View>
//         <Text>Requesting Permission</Text>
//       </View>
//     )
//   }
//
//
//   return (
//     <View>
//     </View>
//   )
// }
//
// export default Scanner;
