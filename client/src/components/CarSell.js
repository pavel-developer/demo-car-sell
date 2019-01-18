import React, { Component } from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Error from './Error';
import Loader from './Loader';

const styles = {
  cardLoadingWrap: {
    height: 500,
  },
  emailSendingWrap: {
    height: 40
  },
  card: {
    wrapper: {
      maxWidth: 600
    },
    button: {
      minWidth: 150
    },
    marginTop: {
      marginTop: 15
    },
    marginRight: {
      marginRight: 15
    },
    link: {
      textDecoration: 'none'
    }
  },
}

class CarSell extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  get sellId() {
    return this.props.match.params.id;
  }

  handleChange(key) {
    return (event) => {
      this.setState({
        [key]: event.target.value,
      });
    }
  }

  saveChanges() {
    const {
      consignPrice,
      dealerPrice,
      preferredSellingMethod
    } = this.state;
    const data = { consignPrice, dealerPrice, preferredSellingMethod };

    this.props.updateCarSell(this.sellId, data);
  }

  sendEmail() {
    this.props.sendEmail(Object.assign({}, this.props.carSell, this.state));
  }

  render() {
    const {
      loading,
      error,
      carSell,
      emailSending
    } = this.props;

    const {
      carColour,
      carPreviousOwners,
      carMileage,
      canDirectSale,
      carYear,
      carMake,
      carModel,
      language,
      customerName,
      phoneNumber,
      email,
      createTime
    } = carSell;

    return error ? 
      (<Error text={error}></Error>) :
      (<Card style={styles.card.wrapper}>
        {
          loading ?
            (<div style={styles.cardLoadingWrap}>
              <Loader size={80} />
            </div>):
            (<>
              <CardContent>
                <Typography variant="h4">Sell Quote Detail</Typography>
                <Typography variant="h6">{ `${ carYear || '' } ${ carMake || '' } ${ carModel || '' } `}</Typography>
                <Divider style={styles.card.marginTop}/>

                <Typography style={styles.card.marginTop}>Color: { carColour || '-' }</Typography>
                <Typography style={styles.card.marginTop}>Hand: { carPreviousOwners || '-' }</Typography>
                <Typography style={styles.card.marginTop}>Mileage: { carMileage || '-' }</Typography>
                <Typography style={styles.card.marginTop}>DS: { canDirectSale || '-' }</Typography>
                <Divider style={styles.card.marginTop}/>

                <Typography style={styles.card.marginTop} variant="h6">PRICE</Typography>
                <TextField
                  style={{...styles.card.marginTop, ...styles.card.marginRight}}
                  label="Consign price"
                  value={this.state.consignPrice || 0}
                  onChange={this.handleChange('consignPrice')}
                  type="number"
                />
                <TextField
                  style={{...styles.card.marginTop, ...styles.card.marginRight}}
                  label="Dealer price"
                  value={this.state.dealerPrice || 0}
                  onChange={this.handleChange('dealerPrice')}
                  type="number"
                />

                <Typography style={styles.card.marginTop} variant="h6">OPTIONS</Typography>
                <RadioGroup
                  value={this.state.preferredSellingMethod || ''}
                  onChange={this.handleChange('preferredSellingMethod')}
                >
                  <FormControlLabel value="dealerOnly" control={<Radio color="primary"/>} label="Dealer only" />
                  <FormControlLabel value="consignOnly" control={<Radio color="primary"/>} label="Consign only" />
                  <FormControlLabel value="consignAndDealer" control={<Radio color="primary"/>} label="Consign + Dealer" />
                </RadioGroup>
                <Button onClick={this.saveChanges.bind(this)} style={styles.card.button} variant="contained" size="small" color="primary">Save</Button>
                <Divider style={styles.card.marginTop}/>

                { 
                  (email) && 
                  <div>
                    <Typography style={styles.card.marginTop} variant="h4">Send email - {language || 'English'}</Typography>
                    <Button disabled={emailSending} onClick={this.sendEmail.bind(this)} style={{...styles.card.marginTop, ...styles.card.button}} variant="contained" size="small" color="primary">Cheap car email</Button>
                    {
                      emailSending && 
                      (<div style={styles.emailSendingWrap}>
                        <Loader size={20} />
                      </div>)
                    }
                    <Divider style={styles.card.marginTop}/>
                  </div>
                }

                {
                  (customerName || phoneNumber || email) &&
                  <div>
                    <Typography style={styles.card.marginTop} variant="h4">Customer detail</Typography>
                    <Typography style={styles.card.marginTop}>Customer name: { customerName || '' }</Typography>
                    <Typography style={styles.card.marginTop}>Phone number: { phoneNumber || '' }</Typography>
                    <Typography style={styles.card.marginTop}>Email: { email || '' }</Typography>
                    {
                      phoneNumber && 
                      <a style={styles.card.link} href={`https://wa.me/${phoneNumber}`} target="_blank">
                        <Button style={{...styles.card.marginTop, ...styles.card.button}} variant="contained" size="small" color="primary">
                          WhatsApp
                        </Button>
                      </a>
                    }
                  </div>
                }

                <Divider style={styles.card.marginTop}/>
                <Typography style={styles.card.marginTop}>Record created at: { moment(createTime).format('MMMM Do YYYY, h:mm') }</Typography>
                <Typography style={styles.card.marginTop}>Firestore ID: { this.sellId }</Typography>
              </CardContent>
            </>)
        }
      </Card>
    );
  }

  componentWillMount() {
    this.props.fetchCarSell(this.sellId);
  }

  componentWillReceiveProps(props) {
    const { 
      consignPrice,
      dealerPrice,
      preferredSellingMethod 
    } = props.carSell;

    this.setState({
      consignPrice,
      dealerPrice,
      preferredSellingMethod
    });
  }
}

export default CarSell;
