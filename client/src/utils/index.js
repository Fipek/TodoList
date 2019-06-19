import { confirmAlert } from 'react-confirm-alert';
import _ from 'lodash';

export const getDependentTaskNames = (taskIdList, dependentTaskIdList) => {
    let result = '';
    for(var i=0; i<dependentTaskIdList.length; i++){
      result +=  taskIdList.filter(todo => todo.id === dependentTaskIdList[i]).map(task => task.title) + " "
    }
    return result;
} 

export const submitConfirm = (func) => {
    confirmAlert({
            title: "Do you really want to delete?",
            message: 'If you confirm, the transaction cannot be undone.',
            buttons: [
                        {
                            label: 'Yes',
                            onClick: () => func()
                        },
                        {
                            label: 'No'
                        }
                    ]
        })
};

export const findListTitle = (listId, list) => {
    return list
        .filter(task => task.listId == listId)
        .map(task => task.title);
};

export const filterTaskForStatus = (list, status) => {
    return list
        .filter(task => task.status === status)
        .map(task => task);
};

export const filterTaskForExpired = (list) => {
    return list
        .filter(task => compareDate(task.deadline))
        .map(task => task);
};

export const compareDate = (date) => {
    let fromDate = new Date(date);
    let currentdate = new Date();
    if(formatDate(fromDate) < formatDate(currentdate))return true;
    else return false;
};

export const formatDate = (date) => {
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
};

export const orderTaskForCreateDate = (list, orderParamater) => {
    return _.sortBy(list, [orderParamater]);
};



 /*return(
      this.props.todotasks.filter(todo => todo.id === taskId).map(task => task.title) + " "
    );*/

/*

export const getDependentTaskNames = (recordId, records) => {
    return records
        .filter(record => record.parentID === recordId)
        .map(record => record.ID );
};

*/