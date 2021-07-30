import dotenv from 'dotenv'

if(process.env.RUN === 'prod' ){
    dotenv.config();
} else {
    dotenv.config({path: `.env.test`});
}


 const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST,
    PORT:process.env.PORT,
    MODO:process.env.MODO,
    MAIL:process.env.MAIL,
    PASSWORDMAIL:process.env.PASSWORDMAIL,
    CLIENTID:process.env.CLIENTID,
    CLIENTSECRET:process.env.CLIENTSECRET,
    BASE:process.env.BASE

}

export default config
