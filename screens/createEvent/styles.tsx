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