import styled from "styled-components/native" ;

export const Container = styled.View({
    paddingVertical: 20,
    paddingHorizontal: 10
})

export const Label = styled.Text({
    fontSize:16,
    color:"gray"
})
type TextField = {
    name: string,
    placeholder: string,
    onChangeText: any,
    onBlur: any,
    value: string,
    keyboardType?: string
    onChange?: any,
    numberOfLines?:number,
    multiline?:boolean
}
export const TextInput = styled.TextInput<TextField>((props:any) => ({
    marginVertical: 8, 
    padding:8 , 
    backgroundColor: "white",
    borderRadius: 12,
    elevation: '5',
    textAlignVertical: "top"
}))


export const DateTimeView = styled.TouchableOpacity({
    marginVertical: 8, 
    padding:8 , 
    backgroundColor: "white",
    borderRadius: 12,
    elevation: '5',
    textAlignVertical: "top",
});
export const DateTimeText = styled.Text({
    color: "black"
});

export const TimeRow = styled.View({
    flexDirection: "row" , 
    justifyContent: "space-between" ,
    
})
type SELECTBOXTYPE = {
    platform :string
}
export const SelectBox = styled.View<SELECTBOXTYPE>(props => ({
    height: props.platform === "ios" ? 35 : 40,
    justifyContent: "center" , 
    alignItems: "center" ,
    textAlign: "center" ,
    paddingLeft: props.platform === "ios" ? 20 : 0 ,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: "white",
    elevation: '5'
}))

export const Button = styled.TouchableOpacity({
    backgroundColor: "#735F8C",
    borderRadius: 8,
    padding: 10,
    marginTop: 30,
    alignItems: "center"
});

export const ButtonText = styled.Text({
    fontSize: 16,
    color: "white",
    fontWeight: "500"
});

export const ErrorText = styled.Text({
    color:"red" ,
    fontSize: 12 , 
    marginBottom: 8
})