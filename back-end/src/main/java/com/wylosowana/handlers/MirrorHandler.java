package com.wylosowana.handlers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.wylosowana.ApiGatewayResponse;

public class MirrorHandler implements RequestHandler<Object, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Object o, Context context) {
        return HandlerUtils.buildResponse().setObjectBody(o).build();
    }
}
