function TaskIconFinder(task){
    {
        switch (task) {
            case "Handyman":
                return require("../assets/img/taskIcon/HandyMan.png");
            case "Delivery":
                return require("../assets/img/taskIcon/Delivery.png");
            case "IT Service":
                return require("../assets/img/taskIcon/ITService.png");
            case "Moving Service":
                return require("../assets/img/taskIcon/MovingService.png");
            case "Personal Assistant":
                return require("../assets/img/taskIcon/PersonalAssistant.png");
            default:
                return require("../assets/img/taskIcon/Delivery.png");
        }
    };
};

export default TaskIconFinder;