import { PermissionsAndroid } from 'react-native';

const requestLocationPermission = async() => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        'title': 'BETA permiso de localización',
        'message': 'Esta aplicación requiere permiso para saber su locacización'
      }
    ).then(() => {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'BETA permiso de localización',
          'message': 'Esta aplicación requiere permiso para saber su locacización'
        })
    })

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("¡Hecho!")
    } else {
      console.log("Permiso denegado :(")
    }
  } catch (err) {
    console.warn(err)
  }
}

export default requestLocationPermission;