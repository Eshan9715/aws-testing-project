import React from "react";
import { Page,View,Text, Document } from "@react-pdf/renderer";

const BLPDF = ({blData,freight,origin,vessel,destination,voyage}) => {
  console.log(blData)
  console.log(voyage)


  return (
    <Document>
    <Page size="A4" style={{ backgroundColor: 'white', padding:'5', flexDirection:'column', width:'100%' }}>
      <View style={{ color: 'black', textAlign: 'center', margin: 10 }}>
        <Text style={{fontWeight:'bold', fontSize:'20'}}>B / L Instructions.</Text>
      </View>
       <View style={{ color: 'black', textAlign: 'start', margin: 5, width:'100%' }}>
        <Text style={{fontSize:'12', color:'#708090'}}>Shipper.</Text>
      </View>
       <View style={{ color: 'black', textAlign: 'start', margin: 2, width:'100%' }}>
        <Text style={{fontSize:'13', marginTop:'2'}}>{blData.shipperName}</Text>
        <Text style={{fontSize:'13', marginTop:'2'}}>{blData.shipperAddress}</Text>
        <Text style={{fontSize:'12', marginTop:'2'}}>{blData.shippermail} / {blData.shipperTele}</Text>

      </View>
      
       <View style={{ color: 'black', textAlign: 'start', marginTop: 10, marginLeft: 5, width:'100%' }}>
        <Text style={{fontSize:'12', color:'#708090'}}>Consignee.</Text>
      </View>
       <View style={{ color: 'black', textAlign: 'start', margin: 2, width:'100%' }}>
       <Text style={{fontSize:'13', marginTop:'2'}}>{blData.consigneeName}</Text>
        <Text style={{fontSize:'13', marginTop:'2'}}>{blData.consigneeAddress}</Text>
        <Text style={{fontSize:'12', marginTop:'2'}}>{blData.consigneemail} / {blData.consigneeTele}</Text>

      </View>
       <View style={{ color: 'black', textAlign: 'start',  marginTop: 10, marginLeft: 5, width:'100%' }}>
        <Text style={{fontSize:'12', color:'#708090'}}>Notify Party.</Text>
      </View>
       <View style={{ color: 'black', textAlign: 'start', margin: 2, width:'100%' }}>
       <Text style={{fontSize:'13', marginTop:'2'}}>{blData.notifyName}</Text>
        <Text style={{fontSize:'13' , marginTop:'2'}}>{blData.notifyAddress}</Text>
        <Text style={{fontSize:'13' , marginTop:'2'}}>{blData.notifymail} / {blData.notifyTele}</Text>

      </View>
      
      <View style={{color: 'black', textAlign: 'start', margin: 5, width:'100%', flexDirection:'row' }}>
      
       <View style={{color: 'black', textAlign: 'start', margin: 2, width:'40%' }}>
        	<Text style={{fontSize:'12', color:'#708090'}}>Vessel.</Text>
        	<Text style={{fontSize:'12' , marginTop:'2'}}>{vessel} / {voyage}</Text>
      	</View>
        
         <View style={{ color: 'black', textAlign: 'start', margin: 2, width:'30%' }}>
        	<Text style={{fontSize:'12', color:'#708090'}}>Port of loading.</Text>
        	<Text style={{fontSize:'13' , marginTop:'2'}}>{origin.split(',')[1]}</Text>
      	</View>
        
         <View style={{ color: 'black', textAlign: 'start', margin: 2, width:'30%' }}>
        	<Text style={{fontSize:'12', color:'#708090'}}>Port of discharge.</Text>
        	<Text style={{fontSize:'13' , marginTop:'2'}}>{destination.split(',')[1]}</Text>
      	</View>

    </View>
      
       <View style={{ color: 'black', textAlign: 'start', margin: 5, width:'100%' }}>
        <Text style={{fontSize:'12', color:'#708090'}}>Mark and Numbers.</Text>
        <Text style={{fontSize:'13' , marginTop:'2'}}>{blData.markNvalues}</Text>

      </View>
      
       <View style={{ color: 'black', textAlign: 'start', margin: 5, width:'100%' }}>
        <Text style={{fontSize:'12', color:'#708090'}}>Cargo Description.</Text>
        <Text style={{fontSize:'13' , marginTop:'2'}}>{blData.cargoDesc}</Text>

      </View>

      <View style={{ color: 'black', textAlign: 'start', margin: 5, width:'100%' }}>
        <Text style={{fontSize:'12', color:'#708090'}}>No: of Packages.</Text>
        <Text style={{fontSize:'13' , marginTop:'2'}}>{blData.NoPackages}</Text>

      </View>

      <View style={{ color: 'black', textAlign: 'start', margin: 5, width:'100%', flexDirection:'row' }}>

        <View style={{ color: 'black', textAlign: 'start', margin: 2, width:'33.3%'}}>

          <Text style={{fontSize:'12', color:'#708090'}}>Gross Weight(Kg).</Text>
          <Text style={{fontSize:'13' , marginTop:'2'}}>{blData.GrossWeight}</Text>
        </View>

        <View style={{ color: 'black', textAlign: 'start', margin: 2, width:'33.3%'}}>

          <Text style={{fontSize:'12', color:'#708090'}}>Net Weight(Kg).</Text>
          <Text style={{fontSize:'13' , marginTop:'2'}}>{blData.NetWeight}</Text>
        </View>

        <View style={{ color: 'black', textAlign: 'start', margin: 2, width:'33.3%'}}>

          <Text style={{fontSize:'12', color:'#708090'}}>Volume(Cbm).</Text>
          <Text style={{fontSize:'13' , marginTop:'2'}}>{blData.Volume}</Text>
        </View>

        
      </View>

      <View style={{ color: 'black', textAlign: 'start', margin: 5, width:'100%' }}>
        <Text style={{fontSize:'12', color:'#708090'}}>Freight Details.</Text>
        <Text style={{fontSize:'13' , marginTop:'2'}}>{freight}</Text>

      </View>

      <View style={{ color: 'black', textAlign: 'start', margin: 5, width:'100%', flexDirection:'row' }}>

        <View style={{ color: 'black', textAlign: 'start', margin: 2, width:'50%'}}>

          <Text style={{fontSize:'12', color:'#708090'}}>Container Number.</Text>
          <Text style={{fontSize:'13' , marginTop:'2'}}>{blData.containerData}</Text>
        </View>

        <View style={{ color: 'black', textAlign: 'start', margin: 2, width:'50%'}}>

          <Text style={{fontSize:'12', color:'#708090'}}>Seal Number.</Text>
          <Text style={{fontSize:'13' , marginTop:'2'}}>{blData.sealData}</Text>
        </View>

      </View>

      <Text
        style={{position: "absolute",fontSize: 12,bottom: 30,left: 0,right: 0,textAlign: "center",color: "grey"}}
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} / ${totalPages}`
        }
        />
    </Page>
  </Document>
  );
};

export default BLPDF;