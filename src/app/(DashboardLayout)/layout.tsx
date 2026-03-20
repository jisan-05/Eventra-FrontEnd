


const DashboardLayout =async ({admin}:{admin:React.ReactNode}) => {
    
    const Roles = "ADMIN"
    return (
        <div>
           {/* {Roles==="CUSTOMER"&& customer}
           {Roles==="PROVIDER"&& provider} */}
           {Roles==="ADMIN"&& admin}
        </div>
    );
};

export default DashboardLayout;