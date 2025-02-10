const editModule = {
	state: {
		requests: [
			{
				"id": 1,
				"date": "2024-03-16",
				"studio": "Music Loft Rehearsal",
				"todo": "Репетиция группы 'Огонь'",
				"category": "Bio",
				"price": 3000,
				"time": "20:00-21:00",
				"createdAt": "2025-02-10T09:00:00",
				"expirationDate": "2025-02-12T10:00:00",
				"status": "new",
				"client_id": 8,
				"paymentStatus": "unpaid"
			},
			{
				"id": 2,
				"date": "2025-02-01",
				"studio": "New School Studio",
				"todo": "Запись трека",
				"category": "Music",
				"price": 4000,
				"time": "18:00-19:00",
				"createdAt": "2025-02-01T10:00:00",
				"expirationDate": "2025-02-03T11:00:00",
				"status": "processed",
				"client_id": 3,
				"paymentStatus": "paid"
			},
			{
				"id": 3,
				"date": "2025-02-02",
				"studio": "Bio Music Lab",
				"todo": "Мастер-класс по вокалу",
				"category": "Education",
				"price": 2500,
				"time": "14:00-15:00",
				"createdAt": "2025-02-02T08:00:00",
				"expirationDate": "2025-02-04T09:00:00",
				"status": "new",
				"client_id": 5,
				"paymentStatus": "unpaid"
			},
			{
				"id": 4,
				"date": "2025-02-03",
				"studio": "Trash Sound Space",
				"todo": "Сведение трека",
				"category": "Production",
				"price": 5000,
				"time": "16:00-17:00",
				"createdAt": "2025-02-03T09:00:00",
				"expirationDate": "2025-02-05T10:00:00",
				"status": "processed",
				"client_id": 1,
				"paymentStatus": "paid"
			},
			{
				"id": 5,
				"date": "2025-02-04",
				"studio": "Oriental Melody Room",
				"todo": "Пробное занятие на ударных",
				"category": "Drums",
				"price": 3500,
				"time": "12:00-13:00",
				"createdAt": "2025-02-04T10:00:00",
				"expirationDate": "2025-02-06T11:00:00",
				"status": "new",
				"client_id": 2,
				"paymentStatus": "unpaid"
			},
			{
				"id": 6,
				"date": "2025-02-05",
				"studio": "Music Loft Rehearsal",
				"todo": "Репетиция группы 'Новый Звук'",
				"category": "Rehearsal",
				"price": 3000,
				"time": "19:00-20:00",
				"createdAt": "2025-02-05T09:00:00",
				"expirationDate": "2025-02-07T10:00:00",
				"status": "processed",
				"client_id": 4,
				"paymentStatus": "paid"
			},
			{
				"id": 7,
				"date": "2025-02-06",
				"studio": "New School Studio",
				"todo": "Запись альбома",
				"category": "Album",
				"price": 6000,
				"time": "17:00-18:00",
				"createdAt": "2025-02-06T08:00:00",
				"expirationDate": "2025-02-08T09:00:00",
				"status": "new",
				"client_id": 6,
				"paymentStatus": "unpaid"
			},
			{
				"id": 8,
				"date": "2025-02-07",
				"studio": "Bio Music Lab",
				"todo": "Урок гитары",
				"category": "Guitar",
				"price": 2000,
				"time": "15:00-16:00",
				"createdAt": "2025-02-07T09:00:00",
				"expirationDate": "2025-02-09T10:00:00",
				"status": "new",
				"client_id": 8,
				"paymentStatus": "paid"
			},
			{
				"id": 9,
				"date": "2025-02-08",
				"studio": "Trash Sound Space",
				"todo": "Сведение альбома",
				"category": "Production",
				"price": 7000,
				"time": "13:00-14:00",
				"createdAt": "2025-02-08T10:00:00",
				"expirationDate": "2025-02-10T11:00:00",
				"status": "new",
				"client_id": 3,
				"paymentStatus": "unpaid"
			},
			{
				"id": 10,
				"date": "2025-02-09",
				"studio": "Oriental Melody Room",
				"todo": "Пробное занятие на клавишах",
				"category": "Keys",
				"price": 3500,
				"time": "11:00-12:00",
				"createdAt": "2025-02-09T09:00:00",
				"expirationDate": "2025-02-11T10:00:00",
				"status": "new",
				"client_id": 5,
				"paymentStatus": "paid"
			},
			{
				"id": 11,
				"date": "2025-02-10",
				"studio": "Music Loft Rehearsal",
				"todo": "Репетиция группы 'Звездный час'",
				"category": "Rehearsal",
				"price": 3000,
				"time": "20:00-21:00",
				"createdAt": "2025-02-10T08:00:00",
				"expirationDate": "2025-02-12T09:00:00",
				"status": "new",
				"client_id": 3,
				"paymentStatus": "unpaid"
			},
			{
				"id": 12,
				"date": "2025-02-11",
				"studio": "New School Studio",
				"todo": "Запись песни",
				"category": "Song",
				"price": 4500,
				"time": "18:00-19:00",
				"createdAt": "2025-02-11T09:00:00",
				"expirationDate": "2025-02-13T10:00:00",
				"status": "new",
				"client_id": 2,
				"paymentStatus": "paid"
			},
			{
				"id": 13,
				"date": "2025-02-12",
				"studio": "Bio Music Lab",
				"todo": "Мастер-класс по бас-гитаре",
				"category": "Bass",
				"price": 2500,
				"time": "14:00-15:00",
				"createdAt": "2025-02-12T10:00:00",
				"expirationDate": "2025-02-14T11:00:00",
				"status": "new",
				"client_id": 7,
				"paymentStatus": "unpaid"
			},
			{
				"id": 14,
				"date": "2025-02-13",
				"studio": "Trash Sound Space",
				"todo": "Сведение песни",
				"category": "Production",
				"price": 5500,
				"time": "16:00-17:00",
				"createdAt": "2025-02-13T08:00:00",
				"expirationDate": "2025-02-15T09:00:00",
				"status": "new",
				"client_id": 8,
				"paymentStatus": "paid"
			},
			{
				"id": 15,
				"date": "2025-02-14",
				"studio": "Oriental Melody Room",
				"todo": "Пробное занятие на перкуссии",
				"category": "Percussion",
				"price": 3000,
				"time": "12:00-13:00",
				"createdAt": "2025-02-14T09:00:00",
				"expirationDate": "2025-02-16T10:00:00",
				"status": "new",
				"client_id": 1,
				"paymentStatus": "unpaid"
			},
			{
				"id": 16,
				"date": "2025-02-15",
				"studio": "Music Loft Rehearsal",
				"todo": "Репетиция группы 'Звездный свет'",
				"category": "Rehearsal",
				"price": 3000,
				"time": "19:00-20:00",
				"createdAt": "2025-02-15T10:00:00",
				"expirationDate": "2025-02-17T11:00:00",
				"status": "new",
				"client_id": 6,
				"paymentStatus": "paid"
			},
			{
				"id": 17,
				"date": "2025-02-16",
				"studio": "New School Studio",
				"todo": "Запись демо-версии",
				"category": "Demo",
				"price": 4000,
				"time": "17:00-18:00",
				"createdAt": "2025-02-16T08:00:00",
				"expirationDate": "2025-02-18T09:00:00",
				"status": "new",
				"client_id": 4,
				"paymentStatus": "unpaid"
			},
			{
				"id": 18,
				"date": "2025-02-17",
				"studio": "Bio Music Lab",
				"todo": "Урок игры на синтезаторе",
				"category": "Synth",
				"price": 2000,
				"time": "15:00-16:00",
				"createdAt": "2025-02-17T09:00:00",
				"expirationDate": "2025-02-19T10:00:00",
				"status": "new",
				"client_id": 7,
				"paymentStatus": "paid"
			},
			{
				"id": 19,
				"date": "2025-02-18",
				"studio": "Trash Sound Space",
				"todo": "Сведение демо-версии",
				"category": "Production",
				"price": 6000,
				"time": "13:00-14:00",
				"createdAt": "2025-02-18T10:00:00",
				"expirationDate": "2025-02-20T11:00:00",
				"status": "new",
				"client_id": 4,
				"paymentStatus": "unpaid"
			},
			{
				"id": 20,
				"date": "2025-02-19",
				"studio": "Oriental Melody Room",
				"todo": "Пробное занятие на фортепиано",
				"category": "Piano",
				"price": 3500,
				"time": "11:00-12:00",
				"createdAt": "2025-02-19T09:00:00",
				"expirationDate": "2025-02-21T10:00:00",
				"status": "processed",
				"client_id": 1,
				"paymentStatus": "paid"
			}
		],
		filter: 'new'
	},
	getters: {
		filteredRequests: (state) => {
			return state.requests.filter(request => request.status === state.filter)
		},
	},

	namespaced: true,

	mutations: {
		REMOVE_REQUEST(state, requestId) {
			state.requests = state.requests.filter(request => request.id !== requestId)
		},
		UPDATE_REQUEST_STATUS(state, { requestId, status }) {
      const request = state.requests.find(r => r.id === requestId);
      if (request) {
        request.status = status;
      }
    },
		SET_FILTER(state, filter) {
			state.filter = filter
		}
	},

	actions: {
		processRequest({ commit }, {requestId, status}) {
			commit('UPDATE_REQUEST_STATUS', { requestId, status })
		},

		declineRequest({ commit }, requestId) {
			commit('UPDATE_REQUEST_STATUS', { requestId, status: 'declined' })
			setTimeout(() => {
				commit('REMOVE_REQUEST', requestId)
			}, 1000)
		},

		setFilter({ commit }, filter) {
			commit('SET_FILTER', filter)
		}
	}
}

// Вспомогательная функция для конвертации названия студии в категорию
function convertStudioToCategory(studio) {
	const mapping = {
		'Music Loft Rehearsal': 'music-loft-rehearsal',
		'New School Studio': 'new-school-studio',
		'Bio Music Lab': 'bio-music-lab',
		'Trash Sound Space': 'trash-sound-space',
		'Oriental Melody Room': 'oriental-melody-room'
	}
	return mapping[studio] || studio.toLowerCase().replace(/\s+/g, '-')
}

export default editModule
