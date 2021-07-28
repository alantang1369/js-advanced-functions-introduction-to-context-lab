// Your code here
function createEmployeeRecord(src){
    let record = {
        firstName: src[0],
        familyName: src[1],
        title: src[2],
        payPerHour: src[3],
        timeInEvents: [],
        timeOutEvents:[]
    }
    return record;
}

function createEmployeeRecords(src){
    return src.map(a => createEmployeeRecord(a))
}

function createTimeInEvent(obj, date){
    let hourDate = date.split(' ');
    let newEvent = {
        type: "TimeIn",
        hour: parseInt(hourDate[1]),
        date: hourDate[0]
    }
    obj.timeInEvents.push(newEvent)
    return obj;
}

function createTimeOutEvent(obj, date){
    let hourDate = date.split(' ');
    let newEvent = {
        type: "TimeOut",
        hour: parseInt(hourDate[1]),
        date: hourDate[0]
    }
    obj.timeOutEvents.push(newEvent)
    return obj;
}

function hoursWorkedOnDate(obj, date){
   let matchTimeIn = obj.timeInEvents.find( e => e.date === date);
   let matchTimeOut = obj.timeOutEvents.find( e => e.date === date);
   return  (matchTimeOut.hour - matchTimeIn.hour)/100;
}

function wagesEarnedOnDate(obj, date){
    return hoursWorkedOnDate(obj, date) * obj.payPerHour
}
function allWagesFor(obj){
    let workDates = []
    obj.timeInEvents.forEach( function(dIn){
        let matchDate = obj.timeOutEvents.find(dOut => dIn.date === dOut.date ).date
        if (matchDate) { workDates.push(matchDate)}
       
    })
    return workDates.reduce(function( total, e){
        return wagesEarnedOnDate(obj, e) + total;
    },0)
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
}