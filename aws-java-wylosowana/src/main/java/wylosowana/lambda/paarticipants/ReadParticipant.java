package wylosowana.lambda.paarticipants;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import wylosowana.model.Participant;
import wylosowana.responses.ApiResponseHandler;
import wylosowana.service.cognito.CognitoService;

import java.util.Map;

public class ReadParticipant implements RequestHandler<Map<String, Object>, ApiGatewayResponse>{

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");

        try {
            Participant participant = new CognitoService().getCognitoUser(pathParameters.get("id"));
            return ApiResponseHandler.createResponse(participant, 200);
        } catch (Exception e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }

}