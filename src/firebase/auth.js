import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyD_9tswGaIh2mdXh5e0npN1olIO4z2PLU8',
	authDomain: 'clinic-admin-282e5.firebaseapp.com',
	databaseURL: 'https://clinic-admin-282e5.firebaseio.com',
	projectId: 'clinic-admin-282e5',
	storageBucket: 'clinic-admin-282e5.appspot.com',
	messagingSenderId: '463272991679',
	appId: '1:463272991679:web:1dec0a949b5c4550a01f0a',
	measurementId: 'G-3XXLNRLDR8',
};

firebase.initializeApp(config);

export default firebase;
