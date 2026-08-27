// export type YAuth = {
// 	init: (
// 		oauthQueryParams: {
// 			client_id: string
// 			response_type: string
// 			redirect_uri: string
// 		},
// 		tokenPageOrigin: string,
// 	) => Promise<{ handler: () => Promise<any> }>
// }

// type Window = {
// 	YaAuthSuggest: YAuth
// }

export type ProjectType = {
	projectOpenId: string
	name: string
	description: string
	dateStart: string
	dateEnd: string
	adminOfProject: string[]
	isCreator: boolean

	project: {
		id_project: string
		name: string
		description: string
		dateStart: string
		dateEnd: string
		adminOfProject: string[]
		isCreator: boolean
	}[]
}

export type ProjectExportType = {
	id_project?: string
	name: string
	description: string
	dateStart?: string
	dateEnd?: string
	adminOfProject: string[]
	isCreator?: boolean
	deletePeople?: string[] // при редактировании проекта добавляю список удаленных людей из него
}

export type TaskType = {
	id_task: string
	name: string
	description: string
	dateStart: string
	dateEnd: string
	status: string
	peopleInProject: string[]
	isCreator: false

	task: {
		id_project: string
		id_task: string
		name: string
		description: string
		dateStart: string
		dateEnd: string
		status: string
		peopleInProject: string[]
		isCreator: false
	}[]
}

export type TaskExportType = {
	id_project: string
	id_task?: string
	name: string
	description: string
	dateStart: string
	dateEnd: string
	status: string
	peopleInProject: string[]
	deletePeopleFromTask?: string[]
	isCreator?: false
}

export type TemporaryRemovalTask = {
	id_task: string
	name: string
	description: string
	dateStart: string
	dateEnd: string
	status: string
	peopleInProject: string[]
	isCreator: boolean // создатель задачи или нет для ее восстановления
}

export type Profile = {
	avatars: string[]
	name: string
	login: string
	password?: string
	token: string
	statuses: string
	friends: string[]
	isHowCreated: boolean
}

export type Registration = {
	login: string
	password: string
	againPassword: string
}

export type CheckPassword = {
	token: string
	password: string
}

export type SearchFriendType = {
	name: string
	users: {
		login: string
		avatars: string
	}[]
}

export type NotificationType = {
	id_notification: string
	text: string
	status: boolean
	statusFriend: boolean
	time: string
	fromUser: string
}

export type FriendType = {
	avatars: string
	login: string
	statusFriend: boolean
}

export type StatusType = {
	id: string
	status: string
	statusAdd: string
	color?: string
}

export type DashBoard = {
	statistics: Statistics[]
	countCreateTask: number
	countDeleteTask: number
	countExpiredTask: number
	countAddFriend: number
	countCreateProject: number
	countDeleteProject: number
	countTaskWereYouAdd: number
	countProjectWereYouAdd: number
}
export type Statistics = {
	month?: number
	countCreateTask: number
	countDeleteTask: number
	countExpiredTask: number
	countAddFriend: number
	countCreateProject: number
	countDeleteProject: number
	countTaskWereYouAdd: number
	countProjectWereYouAdd: number
}
