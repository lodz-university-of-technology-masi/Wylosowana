package wylosowana.lambda.paarticipants;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import wylosowana.model.Participant;
import wylosowana.responses.ApiResponseHandler;
import wylosowana.service.cognito.CognitoService;

import java.util.List;
import java.util.Map;

public class ReadUsers implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {

        try {
            List<Participant> participants = new CognitoService().getCognitoUsers();
            return ApiResponseHandler.createResponse(participants, 200);
        } catch (Exception e) {
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }

}
