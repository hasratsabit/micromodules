class ResponseHandler {
    constructor() {}
    static respondWith(res, httpStatus, title, detail) {
        res.status(httpStatus).send({
            httpStatus,
            title,
            detail
        });
        return;
    }
    
    // OK
    static respondWith200(res, detail = '') {
        ResponseHandler.respondWith(res, 200, 'Ok', detail);
    }

    // Create
    static respondWith201(res, detail = '') {
        ResponseHandler.respondWith(res, 201, 'Resource has been created.', detail);
    }

    // Bad Request
    static respondWith400(res, detail = '') {
        ResponseHandler.respondWith(res, 400, 'Requested data is not recognized by the server.', detail);
    }

    // Unauthorized
    static respondWith401(res, detail = '') {
        ResponseHandler.respondWith(res, 401, 'Not authorized to access resources.', detail);
    }

    static respondWith403(res, detail = '') {
        ResponseHandler.respondWith(res, 403, 'Permission forbidden.', detail);
      }
    
      // Not Found
      static respondWith404(res, detail = '') {
        ResponseHandler.respondWith(res, 404, 'The selected resource could not be found.', detail);
      }
    
      // Unprocessable Entity - Missing Params
      static respondWith422(res, detail = '') {
        ResponseHandler.respondWith(res, 422, 'One or more required parameters are missing or incorrect.', detail);
      }
    
      // Internal Server Error
      static respondWith500(res, detail = '') {
        ResponseHandler.respondWith(res, 500, 'An unexpected error has occurred.', detail);
      }
    
      // Not Implemented
      static respondWith501(res, detail = '') {
        ResponseHandler.respondWith(res, 501, 'Not Implemented', detail);
      }
    
      // Service Unavailable
      static respondWith503(res, detail = '') {
        ResponseHandler.respondWith(res, 503, 'Service Unavailable', detail);
      }
}

module.exports = ResponseHandler;