import React from 'react'
import Text from './Fields/Text'
import Date from './Fields/Date'
import Select from './Fields/Select'
import Phone from './Fields/Phone'
import Number from './Fields/Number'

import { Grid } from '@material-ui/core';

/*const RenderComponent = withStyles(styles)(({params,classes})=>{
    switch (params.type) {      
        case 'text':{
          return (
            <TextField
              disabled={params.disabled}
              id={params.id}
              margin="normal"
              {...params.input}
              label={params.field.placeholder ? params.field.placeholder:''}
              className={classes.formControl}
            />
          )
        }
        case 'email':{
          return (
            <TextField
              disabled={params.disabled}
              id={params.id}
              margin="normal"
              {...params.input}
              label=""
              type="email"
            />
          )
        }
        case 'text-area':{
          return (
            <TextField
              disabled={params.disabled}
              id={params.id}
              label=""
              multiline
              rows={params.field.rows?params.field.rows:4}
              margin="normal"
              variant="outlined"
              fullWidth={true}
              {...params.input}
            />
          )
        }
        case 'select':{
          params.input.value=(params.input.value==="" && params.field.multiple===true)?[]:params.input.value;
          return (
            <Fragment>
             <FormControl className={classes.formControl} >
             <InputLabel htmlFor={params.field.id}>{params.field.placeholder ? params.field.placeholder:''}</InputLabel>
              <Select
               
                disabled={params.disabled}
                {...params.input}
                multiple={params.field.multiple}
                inputProps={{
                  name: params.field.id,
                  id: params.field.id,
                }}

              >
                {params.field.options.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.key}
                  </MenuItem>
                ))}
              </Select>
              </FormControl>
            </Fragment>
          )
        }
        case 'checkbox':{
          return (
          <FormControlLabel
              control={
                  <Checkbox
                  disabled={params.disabled}
                  color="primary"
                  checked={params.input.value ? true : false}
                  onChange={params.input.onChange}
                  className={params.field.styles ? params.field.styles : '' }
                  />
              }
              label={params.field.label}
              />
          );
        }
        case 'password':{
          return <Input id={params.id} type="password" {...params.input} disabled={params.disabled} />;
        }
        case 'date':{
          params.input.value =(!params.input.value || params.input.value==="Invalid date") ? null : new Date(params.input.value);
          return (
            <DatePicker
              disabled={params.disabled}
              customInput={ ( <TextField />)}
              onChange={params.input.onChange}
              dateFormat="yyyy-MM-dd"
              strictParsing
              selected={params.input.value}
              minDate={params.field.minDate}
              maxDate={params.field.maxDate}
              {...params.input}
          />
          )
        }
        case 'time':{
          
          return (
            <TextField
              disabled={params.disabled}
              id={params.id}
              type="time"
              step="1"
              label={params.field.placeholder ? params.field.placeholder:''}
              {...params.input}
              className={classes.inputTime}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          )
        }
        case 'datetime-local':{
          params.input.value =(!params.input.value || params.input.value==="Invalid date") ? null : new Date(params.input.value);
          return (
            <DatePicker
                disabled={params.disabled}
                customInput={ ( <TextField />)}
                onChange={params.input.onChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd hh:mm"
                timeCaption="time"
                selected={params.input.value}
                minDate={params.field.minDate}
                maxDate={params.field.maxDate}
                {...params.input}
            />
          );
        }
        case 'switch':{
          return (
            <Switch
              disabled={params.disabled}
              disableRipple
              {...params.input}
              color="primary"
              checked={params.input.value && (params.field.checked===undefined || params.field.checked===true) ? true : false}
              onChange={params.input.onChange}
            />
          )
        }
        case 'number':{
          return (
            <TextField
              disabled={params.disabled}
              className={classes.formControl}
              id={params.id}
              margin="normal"
              {...params.input}
              label={params.field.placeholder ? params.field.placeholder:''}
              type="number"
              inputProps={{ min: params.field.min, max: params.field.max, step: "1" }}
            />
          );
        }
        case 'file':{
          const handleChange = (event, input) => {            
            event.preventDefault();
            let imageFile = event.target.files[0];
            if (imageFile) {
              const localImageUrl = URL.createObjectURL(imageFile);
              const imageObject = new window.Image();
      
              imageObject.onload = () => {
                imageFile.width = imageObject.naturalWidth;
                imageFile.height = imageObject.naturalHeight;
                input.onChange(imageFile);
                URL.revokeObjectURL(imageFile);
              };
              imageObject.src = localImageUrl;
      
              handlePreview(localImageUrl);
            }
          };
          const handlePreview = imageUrl => {
            
            params.field.change('avatar',imageUrl)
            
          };

          return (<div>
            {params.field.images && params.field.images.map(({label,classesPhoto,classesDefault,DefaultImage},index) =>
              <Grid key={index} item xs={12}>
                <Grid container>
                {label && <SubHeading type={params.field.type} label={label} classes={params.classes} title={true}/>}
                  <Grid item xs={label?6:12} className={classes.input}>
                    {params.field.avatar ? (
                      <img 
                        key={index}
                        src={params.field.avatar}
                        alt={label}
                        className={classesPhoto}
                        onClick={() => document.getElementById(params.field.id).click()}
                      />
                    ) : (
                      DefaultImage ?
                      <DefaultImage 
                        className={classesDefault}
                        onClick={() => document.getElementById(params.field.id).click()} 
                      />:
                      <Texture
                        className={classesDefault}
                        onClick={() => document.getElementById(params.field.id).click()}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>)
            }
           
            <input
                id={params.field.id}
                disabled={params.disabled}
                name={params.field.field}
                type={params.field.type}
                accept="image/jpeg, image/png"
                style={{ display:'none' }}
                onChange={event => handleChange(event, params.input)}
              />          
          </div>)

        }
        default: return <div></div>
    }
});

const SubHeading = withStyles(styles)((props) => {
  if(props.type!=="checkbox" && props.title){
  return (
    <Grid item xs={6} className={props.classes.inputLabel}>
      <Typography variant={props.type==='label'?"h6":"subtitle1"} gutterBottom>
        {props.label}
      </Typography>
    </Grid>)
  }
  return <div></div>
})*/

class RenderFields extends React.Component{

    constructor(props){
        super(props)

    }

    render(){
      const { children,lineal }=this.props
      const totalFields=children.length;
      let movil=12
      let desktop=5
      return children.map((input,index) => {
        switch(input.type){

          case 'text': return <Grid item xs={movil} sm={desktop}> <Text {...input} /></Grid>
          case 'select': return <Grid item xs={movil} sm={totalFields>1 ? desktop :12} style={{paddingTop:16}} ><Select {...input} /></Grid>
          case 'phone': return <Grid item xs={movil} sm={desktop} style={{paddingTop:16}}><Phone {...input} /></Grid>
          case 'number': return <Grid item xs={movil} sm={desktop}> <Number {...input} /></Grid>
          case 'date': return <Grid item xs={movil} sm={desktop}> <Date {...input} /></Grid>
          default: return <div>No esta creado</div>
        }
      });
    }

}

export default RenderFields;