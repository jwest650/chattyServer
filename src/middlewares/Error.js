async function Error(status, message) {
     let err = new Error();
     err.message = message;
     err.status = status;

     return err;
}
