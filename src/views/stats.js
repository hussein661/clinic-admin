

export const getLastSevenDaysSms = email => {
    let today = new Date()
    
    let smsDaysArray = []
    for(var i=6;i>=0;i--){
        let startOfOldDay = new Date(moment(today).subtract(i,'days').startOf('day'))
        let endOfOldDay = new Date(moment(today).subtract(i,'days').endOf('day'))
        const URL = 'https://dev.montymobile.com/api/messageAnalysis';
        Axios.post(URL, {
            client: 'uxmx123@gmail.com',
            startDate: startOfOldDay,
            endDate: endOfOldDay,
        }).then(r => smsDaysArray.push(r.data[0].quantity))
        .catch(e=>smsDaysArray.push(0))
    }
    setTimeout(() => {
       return smsDaysArray
    }, 1000);
};
