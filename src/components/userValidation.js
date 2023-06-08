import * as yup from "yup";

 export const userSchema1 = yup.object().shape({
    name: yup.string().required('Please Enter your name'),
    username: yup.string().required('Please Enter username'),
    mobileNum: yup.string().matches(/^(?:0|94|\+94)?(?:|7(0|1|2|4|5|6|7|8)\d)\d{6}$/, 'Phone number is not valid').required('Please Enter your mobile number'),
    companyName: yup.string().required('Please Enter your company name'),


 })

 export const loginSchema = yup.object().shape({
   email: yup.string().email().matches( /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Valid email is required!").required('Please Enter your email'),
   password: yup.string().required('Please Enter your password'),


})

export const lclRates = yup.object().shape({
   rate: yup.string().required('Please Enter rate'),
   validDate: yup.string().required("valid date required"),

})

 export const userSchema2 = yup.object().shape({
   email: yup.string().email().matches( /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Valid email is required!").required('Please Enter your email'),
   password: yup.string().min(6,'Too Short!').max(10,'Too Long!').required('Please Enter your password'),
   confirmPassword: yup.string().required("Please Re-Enter your password").oneOf([yup.ref("password"), null], "Passwords must match"),
   tradeTerm: yup.string().required('Please Enter trade term'),

})

// export const userSchema3 = yup.object().shape({
//    preShipments: yup.string().required('Please Enter shipment experience'),
//    comdoType: yup.string().required('Please Enter frequient comodity type'),
//    shipDate: yup.string().required('Please Enter upcoming ship date'),

// })

export const userSchema5 = yup.object().shape({
   Containers: yup.array().of(
      yup.object().shape({
        containerType: yup.string().required("ContainerType required"),
        quantity: yup.string()
          .required("Container quantity required")
      }))

})

export const userSchema6 = yup.object().shape({
   Packages: yup.array().of(
      yup.object().shape({
         PKGStype:  yup.string().required("Package type required"),
         PKGScount:  yup.string().required("Package total required"),
         PKGSvolume:  yup.string().required("Packages volume required"),
         PKGSGweight: yup.string().required("Packages Gross weight required"),
         PKGSNweight: yup.string().required("Packages Net weight required"),

      }))
})

export const userSchema7 = yup.object().shape({
   Rates: yup.array().of(
      yup.object().shape({
        containerType: yup.string().required("ContainerType required"),
        price: yup.string()
          .required("Container price required")
      }))

})

// export const userSchema7 = yup.object().shape({
//    PKGtype:  yup.string().required("Package type required"),
//    PKGcount:  yup.string().required("Package total required"),
//    PKGlength:  yup.string().required("Package length required"),
//    PKGheight:  yup.string().required("Packages height required"),
//    PKGwidth: yup.string().required("Packages width required"),
//    PKGweight: yup.string().required("Packages weight required"),

// })

export const userSchema8 = yup.object().shape({
   SRates: yup.array().of(
      yup.object().shape({
        sLine: yup.string().required("Shipping line required"),
        containerType: yup.string().required("ContainerType required"),
        rate: yup.string()
          .required("Container price required"),
        date: yup.date().required("Future date required"),
      }))
   
})

export const userSchema9 = yup.object().shape({
   SSchedules: yup.array().of(
      yup.object().shape({
        ETD: yup.date().required("ETD required"),
        ETA: yup.date().required("ETA required"),
        Transit: yup.string().required("Transit required"),
        ShipMode: yup.string().required("ShipMode required"),
        Transhipments: yup.string().ensure().when('ShipMode', {
         is: 'Transhipment',
         then: yup.string().required("Transhipments required")}),
        Vessel: yup.string().required("Vessel required"),
        Voyage: yup.string().required("Voyage required"),
      }))
   
})

export const userSchema9L = yup.object().shape({
   SSchedules: yup.array().of(
      yup.object().shape({
        ETAD: yup.date().required("ETA-Destintion required"),
        ETAC: yup.date().required("ETA-Colombo required"),
        ETDC: yup.date().required("ETD-Colombo required"),
        LCLClosingDate: yup.date().required("LCL-Closing Date required"),
        LCLClosingTime: yup.string().required("LCL-Closing Time required"),
        Vessel: yup.string().required("Vessel required"),
        Voyage: yup.string().required("Voyage required"),
      }))
   
})

export const userSchema10 = yup.object().shape({
   Desc: yup.array().of(
      yup.object().shape({
      Commodity: yup.string().required("Commodity description required"),

      }))
   
})
