package wylosowana.OwnLambda.Answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;

import java.util.Map;

public class ReadUserAnswersTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    // getAnswer  -- zwracasz tutaj test i odpowiedzi. Na razie to zostawiam.
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");
//
//        try {
//            List<TestAnswer> answers = new TablesMapperAnswers().getUserTestAnswers(pathParameters.get("userId"), pathParameters.get("testId")).getAnswers();
//            return ApiResponseHandler.createResponse(answers, 200);
//        } catch (Exception  e) {
//            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
//        }
        return null;
    }
}
