import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Email from '@material-ui/icons/Email';
import Phone from '@material-ui/icons/Phone';

const styles = (theme) => ({

    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
        borderTop: '1px solid rgba(112, 112, 112, 0.5)',
        margin: '0 32px 0 72px',
        [theme.breakpoints.down('sm')]: {
            margin: '0 32px',
        },

        [theme.breakpoints.down('xs')]: {
            margin: '0 32px',
            border: 'none',
            height: 30,
            display: 'block',
        },
    },
    footerItem: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 12,
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
        },
    },
    contactInfoContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 'normal',
        width: 378,
        [theme.breakpoints.down('xs')]: {
            width: 'auto',
            display: 'block',
        },
    },
    contactInfo: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    info: {
        marginLeft: 7,
        color: 'black',
        textDecoration: 'none',
    },
    verticalSeparator: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(112, 112, 112, 0.5)',
    },

});

function Footer({ classes }) {
    return (

        <footer className={classes.footer}>
            <div className={classes.footerItem}>Todos los Derechos Reservados. © GestionGeo 2021</div>
            <div className={classes.footerItem}>
                <div className={classes.contactInfoContainer}>
                    <div className={classes.contactInfo}>
                        <Email />
                        <a href="mailto:postgrado.geoquimica@gmail.com" className={classes.info}>
                            postgrado.geoquimica@gmail.com
              </a>
                    </div>
                    <span className={classes.verticalSeparator} />
                    <div className={classes.contactInfo}>
                        <Phone />
                        <span className={classes.info}>+58 212 6051082</span>
                    </div>
                </div>
            </div>
        </footer>

    );
}

Footer.propTypes = {
    classes: PropTypes.shape({

        footer: PropTypes.string,
        footerItem: PropTypes.string,
        contactInfoContainer: PropTypes.string,
        contactInfo: PropTypes.string,
        info: PropTypes.string,
        verticalSeparator: PropTypes.string,

    }).isRequired,

};
const FooterWrapper = withStyles(styles, { withTheme: true })(
    Footer
);
export default FooterWrapper;
