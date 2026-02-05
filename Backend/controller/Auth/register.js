const register = async (req,resizeBy,next) => {
    try{
         const registerDetails =await registerValidation.validateAsync(req.body);
         const {
            name, 
           email,
           phone,secondphone,
           age, joiningdate,leavingdate, designation,department,
           address,roles,primraryeducation,
              secondaryeducation,
              degree,
              documnets,
              certificates,
           picture,gender,
           date,userid,
           password,  fathername, mothername,fatheremail,fathernumber,mothernumber,
         } = registerDetails;

        const saveRegisterData = new RegisterModel({
          firstname,
           middlename,
           lastname,
           email,
           phone,secondphone,roles,
           age,gender,joiningdate, designation,department,leavingdate,
           address,primraryeducation,
              secondaryeducation,
              degree,
              documnets,
              certificates,
           picture,
           date,userid,
           password,
           fathername, mothername,fatheremail,fathernumber,mothernumber,
         });   
        console.log(registerDetails);
        await saveRegisterData.save();
        return res.status(200).json({
        message: "Api worked correctly",
        success: true,
        });
      } 
      catch (error) {
    next(error);
    console.log(error);
    }
}
module.exports = register;