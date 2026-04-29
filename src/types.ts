export type CustomerData = {

    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;

    _links:{
        self:{
            href:string;
        };  
    };
};

export type Customer = Omit<CustomerData, "_links">

export type TrainingsData = {
    
    date: string;
    duration: number;
    activity: string;
    customer: Customer | string;

    _links:{
        self:{
            href:string;
        };  
    };
};

export type Trainings = Omit<TrainingsData,"_links">