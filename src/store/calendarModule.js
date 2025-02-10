


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
				status: "whithout",
				price: 3000,
				client_id: 7
			},
			{
				id: 10,
				title: "Подготовка к концерту",
				start: "2025-02-10T22:00:00",
				end: "2025-02-10T23:00:00",
				category: "trash-sound-space",
				status: "whithout",
				price: 3000,
				client_id: 8
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
				fee: 550
			},
			{
				id: 2,
				name: "Группа Огонь",
				phone: "89258888888",
				email: "ogon@music.com",
				closed: 36,
				messages: 48,
				rating: 1500,
				fee: 700
			},
			{
				id: 3,
				name: "Валерий Кипелов",
				phone: "89259999999",
				email: "kipelov@music.com",
				closed: 42,
				messages: 56,
				rating: 1800,
				fee: 800
			},
			{
				id: 4,
				name: "Amatory",
				phone: "89251111111",
				email: "amatory@music.com",
				closed: 28,
				messages: 32,
				rating: 1300,
				fee: 600
			},
			{
				id: 5,
				name: "Раскол",
				phone: "89252222222",
				email: "raskol@music.com",
				closed: 30,
				messages: 36,
				rating: 1400,
				fee: 650
			},
			{
				id: 6,
				name: "Brecha",
				phone: "89253333333",
				email: "brecha@music.com",
				closed: 26,
				messages: 30,
				rating: 1250,
				fee: 580
			},
			{
				id: 7,
				name: "Leps",
				phone: "89254444444",
				email: "leps@music.com",
				closed: 34,
				messages: 40,
				rating: 1600,
				fee: 720
			},
			{
				id: 8,
				name: "Ирина Аллегрова",
				phone: "89255555555",
				email: "allegrova@music.com",
				closed: 22,
				messages: 28,
				rating: 1100,
				fee: 520
			},
		],
		redactingEvent: null
	},
	mutations: {
		SET_CALENDAR_STATE(state, payload) {
			state.calendarState = payload
			localStorage.setItem('calendarState', JSON.stringify(payload))
		},
		SET_REDACTING_EVENT(state, payload) {
			state.redactingEvent = payload
				localStorage.setItem('redactingEvent', JSON.stringify(payload))
		}
	},
	actions: {
		getCashedCalendarState({ commit }) {
			let calendarState = localStorage.getItem('calendarState')
			if (!calendarState) {
				return
			}
			calendarState = JSON.parse(calendarState)
			calendarState.date = new Date(calendarState.date)
			commit('SET_CALENDAR_STATE', calendarState)
		}
	},
	getters: {
    getEventsByDate: (state) => (date, location) => {
      return state.events.filter(event => {
        const eventDate = new Date(event.start);
        const targetDate = new Date(date);
        const isSameDate = eventDate.toDateString() === targetDate.toDateString();
        
        // Если выбраны все студии, возвращаем все события за дату
        if (location === 'all-studios') {
          return isSameDate;
        }
        
        // Иначе фильтруем по конкретной студии
        return isSameDate && event.category === location;
      });
		}
	},
	namespaced: true,
}


export default calendarModule