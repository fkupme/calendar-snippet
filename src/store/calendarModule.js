const calendarModule = {
	state: {
		calendarState: {},
		events: [
			{
				id: 1,
				title: "Новый заказ",
				start: "2025-02-10T09:00:00",
				end: "2025-02-10T10:00:00",
				category: "music-loft-rehearsal",
				status: "reserved",
				price: 2500,
				client_id: 1
			},
			{
				id: 2,
				title: "Семен",
				start: "2025-02-10T11:00:00",
				end: "2025-02-10T12:00:00",
				category: "bio-music-lab",
				status: "reserved",
				price: 2500,
				client_id: 1
			},
			{
				id: 3,
				title: "Репетиция группы 'Огонь'",
				start: "2025-02-10T13:00:00",
				end: "2025-02-10T15:00:00",
				category: "new-school-studio",
				status: "paid",
				price: 5000,
				client_id: 2
			},
			{
				id: 4,
				title: "Запись трека для клиента",
				start: "2025-02-10T16:00:00",
				end: "2025-02-10T18:00:00",
				category: "trash-sound-space",
				status: "paid",
				price: 7000,
				client_id: 7
			},
			{
				id: 5,
				title: "Мастер-класс по вокалу",
				start: "2025-02-10T10:00:00",
				end: "2025-02-10T12:00:00",
				category: "oriental-melody-room",
				status: "paid_partially",
				price: 3500,
				client_id: 3
			},
			{
				id: 6,
				title: "Пробное занятие на ударных",
				start: "2025-02-10T14:00:00",
				end: "2025-02-10T15:00:00",
				category: "music-loft-rehearsal",
				status: "paid_partially",
				price: 1500,
				client_id: 4
			},
			{
				id: 7,
				title: "Сведение трека",
				start: "2025-02-10T19:00:00",
				end: "2025-02-10T21:00:00",
				category: "bio-music-lab",
				status: "closed",
				price: 6000,
				client_id: 5
			},
			{
				id: 8,
				title: "Кастомизация звука",
				start: "2025-02-10T12:00:00",
				end: "2025-02-10T13:00:00",
				category: "new-school-studio",
				status: "closed",
				price: 4000,
				client_id: 6
			},
			{
				id: 9,
				title: "Подготовка к концерту",
				start: "2025-02-10T22:00:00",
				end: "2025-02-10T23:00:00",
				category: "trash-sound-space",
				status: "without",
				price: 3000,
				client_id: 7
			},
			{
				id: 10,
				title: "Подготовка к концерту",
				start: "2025-02-10T22:00:00",
				end: "2025-02-10T23:00:00",
				category: "trash-sound-space",
				status: "without",
				price: 3000,
				client_id: 8
			},
			{
				id: 11,
				title: "Запись нового альбома",
				start: "2025-02-11T09:00:00",
				end: "2025-02-11T12:00:00",
				category: "music-loft-rehearsal",
				status: "paid",
				price: 10000,
				client_id: 9
			},
			{
				id: 12,
				title: "Репетиция концерта",
				start: "2025-02-12T14:00:00",
				end: "2025-02-12T17:00:00",
				category: "new-school-studio",
				status: "reserved",
				price: 7500,
				client_id: 10
			},
			{
				id: 13,
				title: "Мастер-класс по гитаре",
				start: "2025-02-13T10:00:00",
				end: "2025-02-13T12:00:00",
				category: "oriental-melody-room",
				status: "paid_partially",
				price: 4000,
				client_id: 11
			},
			{
				id: 14,
				title: "Сведение трека",
				start: "2025-02-14T16:00:00",
				end: "2025-02-14T18:00:00",
				category: "bio-music-lab",
				status: "paid",
				price: 6000,
				client_id: 12
			},
			{
				id: 15,
				title: "Запись вокала",
				start: "2025-02-15T13:00:00",
				end: "2025-02-15T15:00:00",
				category: "trash-sound-space",
				status: "reserved",
				price: 5000,
				client_id: 13
			},
			{
				id: 16,
				title: "Репетиция с оркестром",
				start: "2025-02-16T09:00:00",
				end: "2025-02-16T12:00:00",
				category: "music-loft-rehearsal",
				status: "paid",
				price: 12000,
				client_id: 9
			},
			{
				id: 17,
				title: "Запись клипа",
				start: "2025-02-17T14:00:00",
				end: "2025-02-17T18:00:00",
				category: "new-school-studio",
				status: "reserved",
				price: 15000,
				client_id: 10
			},
			{
				id: 18,
				title: "Мастер-класс по вокалу",
				start: "2025-02-18T10:00:00",
				end: "2025-02-18T12:00:00",
				category: "oriental-melody-room",
				status: "paid_partially",
				price: 4500,
				client_id: 11
			},
			{
				id: 19,
				title: "Сведение альбома",
				start: "2025-02-19T16:00:00",
				end: "2025-02-19T20:00:00",
				category: "bio-music-lab",
				status: "paid",
				price: 8000,
				client_id: 12
			},
			{
				id: 20,
				title: "Запись инструментов",
				start: "2025-02-20T13:00:00",
				end: "2025-02-20T15:00:00",
				category: "trash-sound-space",
				status: "reserved",
				price: 5500,
				client_id: 13
			},
			{
				id: 21,
				title: "Репетиция с хором",
				start: "2025-02-21T09:00:00",
				end: "2025-02-21T12:00:00",
				category: "music-loft-rehearsal",
				status: "paid",
				price: 11000,
				client_id: 9
			},
			{
				id: 22,
				title: "Запись саундтрека",
				start: "2025-02-22T14:00:00",
				end: "2025-02-22T17:00:00",
				category: "new-school-studio",
				status: "reserved",
				price: 9000,
				client_id: 10
			},
			{
				id: 23,
				title: "Мастер-класс по ударным",
				start: "2025-02-23T10:00:00",
				end: "2025-02-23T12:00:00",
				category: "oriental-melody-room",
				status: "paid_partially",
				price: 3500,
				client_id: 11
			},
			{
				id: 24,
				title: "Сведение трека",
				start: "2025-02-24T16:00:00",
				end: "2025-02-24T18:00:00",
				category: "bio-music-lab",
				status: "paid",
				price: 6000,
				client_id: 12
			},
			{
				id: 25,
				title: "Запись вокала",
				start: "2025-02-25T13:00:00",
				end: "2025-02-25T15:00:00",
				category: "trash-sound-space",
				status: "reserved",
				price: 5000,
				client_id: 13
			}
		],
		clients: [
			{
				id: 1,
				name: "Семен",
				phone: "89257777777",
				email: "semen@gmail.com",
				closed: 24,
				messages: 24,
				rating: 1200,
				fee: 550,
				status: 'pro',
				avatar: '/images/user-avatar.png'
			},
			{
				id: 2,
				name: "Группа Огонь",
				phone: "89258888888",
				email: "ogon@music.com",
				closed: 36,
				messages: 48,
				rating: 1500,
				fee: 700,
				status: 'pro',
				avatar: null
			},
			{
				id: 3,
				name: "Валерий Кипелов",
				phone: "89259999999",
				email: "kipelov@music.com",
				closed: 42,
				messages: 56,
				rating: 1800,
				status: null,
				avatar: '/images/user-avatar.png'
			},
			{
				id: 4,
				name: "Amatory",
				phone: "89251111111",
				email: "amatory@music.com",
				closed: 28,
				messages: 32,
				rating: 1300,
				fee: 600,
				status: 'pro',
				avatar: null
			},
			{
				id: 5,
				name: "Раскол",
				phone: "89252222222",
				email: "raskol@music.com",
				closed: 30,
				messages: 36,
				rating: 1400,
				fee: 650,
				status: 'pro',
				avatar: '/images/user-avatar.png'
			},
			{
				id: 6,
				name: "Brecha",
				phone: "89253333333",
				email: "brecha@music.com",
				closed: 26,
				messages: 30,
				rating: 1250,
				status: null,
				avatar: null
			},
			{
				id: 7,
				name: "Leps",
				phone: "89254444444",
				email: "leps@music.com",
				closed: 34,
				messages: 40,
				rating: 1600,
				fee: 720,
				status: 'pro',
				avatar: '/images/user-avatar.png'
			},
			{
				id: 8,
				name: "Ирина Аллегрова",
				phone: "89255555555",
				email: "allegrova@music.com",
				closed: 22,
				messages: 28,
				rating: 1100,
				status: null,
				avatar: null
			},
			{
				id: 9,
				name: "Филипп Киркоров",
				phone: "89256666666",
				email: "kirkorov@music.com",
				closed: 50,
				messages: 60,
				rating: 2000,
				fee: 1000,
				status: 'pro',
				avatar: '/images/user-avatar.png'
			},
			{
				id: 10,
				name: "Алла Пугачева",
				phone: "89257777777",
				email: "pugacheva@music.com",
				closed: 45,
				messages: 55,
				rating: 1900,
				fee: 950,
				status: 'pro',
				avatar: null
			},
			{
				id: 11,
				name: "Дима Билан",
				phone: "89258888888",
				email: "bilan@music.com",
				closed: 40,
				messages: 50,
				rating: 1800,
				status: null,
				avatar: '/images/user-avatar.png'
			},
			{
				id: 12,
				name: "Григорий Лепс",
				phone: "89259999999",
				email: "leps@music.com",
				closed: 35,
				messages: 45,
				rating: 1700,
				fee: 850,
				status: 'pro',
				avatar: null
			},
			{
				id: 13,
				name: "Валерия",
				phone: "89251010101",
				email: "valeria@music.com",
				closed: 30,
				messages: 40,
				rating: 1600,
				status: null,
				avatar: '/images/user-avatar.png'
			}
		],
		redactingEvent: null,
		filteredClients: []
	},
	mutations: {
		SET_CALENDAR_STATE(state, payload) {

			state.calendarState = payload
			localStorage.setItem('calendarState', JSON.stringify(payload))
		},
		SET_REDACTING_EVENT(state, payload) {
			state.redactingEvent = payload
			localStorage.setItem('redactingEvent', JSON.stringify(payload))
		},
		ADD_EVENT(state, event) {
			state.events.push(event)
		},
		SET_FILTERED_CLIENTS(state, payload) {
			state.filteredClients = payload
		},

		PUSH_CLIENT(state, client) {
			state.clients.push(client)
		}
	},
	actions: {
		getCashedCalendarState({ commit, state }) {

			let calendarState = localStorage.getItem('calendarState')
			if (!calendarState) {
				return
			}
			calendarState = JSON.parse(calendarState)
			calendarState.date = new Date(calendarState.date)
			commit('SET_CALENDAR_STATE', calendarState)
			commit('SET_FILTERED_CLIENTS', state.clients)

		},
		addEvent({ commit }, event) {
			commit('ADD_EVENT', event)
		},
		fetchClients({ state, commit }, { search, searchFields }) {
			if (!search?.trim()) {
				commit('SET_FILTERED_CLIENTS', null)
				return
			}
			const searchLower = search.toLowerCase().trim();
			const filtered = state.clients.filter(client => {
				return searchFields.some(field => {
					const value = client[field];
					if (!value) return false;
					return value.toString().toLowerCase().includes(searchLower);
				});
			});
      
      
			commit('SET_FILTERED_CLIENTS', filtered)
		},




		pushClient({ commit }, client) {
			commit('PUSH_CLIENT', client)
			return client;
		}
	},
	getters: {

		getEventsByDate: (state) => (date, location) => {
			return state.events.filter(event => {
				const eventDate = new Date(event.start)
				const targetDate = new Date(date)
				const isSameDate = eventDate.toDateString() === targetDate.toDateString()
				if (location === 'all-studios') {
					return isSameDate
				}
				return isSameDate && event.category === location
			})
		},

		getFilteredClients: (state) => state.filteredClients,

    getClientById: (state) => (id) => {
      return state.clients.find(client => client.id === id).name;
    }
	},
	namespaced: true,

}


export default calendarModule