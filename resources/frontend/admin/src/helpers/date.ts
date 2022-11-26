
import moment from 'moment';

const date = {
    formatDate(date: String, format = null){
        let formatted_date = date;
        if(format){
            formatted_date = moment(String(date)).format(format)
        }else{
            formatted_date = moment(String(date)).format('MMMM DD, YYYY h:ss A')
        }

        return formatted_date;
    },
    daysLeft(date: Date){
        let dateFormatted = new Date(date);
        var seconds = Math.floor((dateFormatted - new Date()) / 1000);

        return Math.floor(seconds / (3600*24));
    },
}

export default date