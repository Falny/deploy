import { useSelector } from 'react-redux'
import { type RootState } from '../redux/store'

export default function NotificationHook() {
	const Notification = useSelector(
		(state: RootState) => state.notification.notification,
	)
	const countOfNote = Notification.filter(obj => !obj.status).length // количество непрочитанных уведомлений

	return { Notification, countOfNote }
}
