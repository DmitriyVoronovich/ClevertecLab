const today = new Date().setDate(new Date().getDate());
const dayAfterTomorrow = new Date().setDate(new Date().getDate() + 1);
const dayBeforeToday = new Date().setDate(new Date().getDate() - 1);
const twoDaysLater = new Date().setDate(new Date().getDate() + 2);
const threeDaysLater = new Date().setDate(new Date().getDate() + 3);
const fourDaysLater = new Date().setDate(new Date().getDate() + 4);
// const nextMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
const nextMonth = new Date().setDate(new Date().getDate() + 15);

export const userTrain = [
    {
        _id: "1",
        name: "Ноги",
        date: today,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: 6,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Присяд",
                replays: 3,
                weight: 50,
                approaches: 10,
            },
            {
                _id: "2",
                name: "Толкание нагрузки",
                replays: 3,
                weight: 70,
                approaches: 10,
            },
        ],
    },
    {
        _id: "2",
        name: "Руки",
        date: today,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "2",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "3",
        name: "Силовая",
        date: twoDaysLater,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "4",
        name: "Спина",
        date: twoDaysLater,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "5",
        name: "Грудь",
        date: twoDaysLater,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "6",
        name: "Ноги",
        date: twoDaysLater,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "7",
        name: "Руки",
        date: twoDaysLater,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "8",
        name: "Силовая",
        date: threeDaysLater,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Присяд",
                replays: 3,
                weight: 50,
                approaches: 10,
            },
            {
                _id: "2",
                name: "Толкание нагрузки",
                replays: 3,
                weight: 70,
                approaches: 10,
            },
        ],
    },
    {
        _id: "9",
        name: "Спина",
        date: threeDaysLater,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "10",
        name: "Грудь",
        date: threeDaysLater,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "11",
        name: "Ноги",
        date: threeDaysLater,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "12",
        name: "Руки",
        date: fourDaysLater,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "13",
        name: "Силовая",
        date: dayBeforeToday,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "14",
        name: "Спина",
        date: dayAfterTomorrow,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "15",
        name: "Грудь",
        date: dayAfterTomorrow,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "16",
        name: "Ноги",
        date: nextMonth,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "17",
        name: "Руки",
        date: nextMonth,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "18",
        name: "Силовая",
        date: nextMonth,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "19",
        name: "Спина",
        date: nextMonth,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
    {
        _id: "20",
        name: "Грудь",
        date: nextMonth,
        isImplementation: false,
        userId: "65b809899adc9e39e3660ae0",
        parameters: {
            jointTraining: false,
            participants: [],
            period: null,
            repeat: false,
        },
        exercises: [
            {
                _id: "1",
                name: "Упражнение",
                replays: 1,
                weight: 0,
                approaches: 3,
            },
        ],
    },
];
