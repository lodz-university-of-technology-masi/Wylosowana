package wylosowana.lambda.answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import wylosowana.mappers.TablesMapperAnswers;
import wylosowana.model.TestAnswers.TestAnswer;
import wylosowana.responses.ApiResponseHandler;

import java.util.Map;

public class ReadAnswer implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private final Logger logger = LogManager.getLogger(this.getClass());
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        Map<String,String> pathParameters =  (Map<String,String>)input.get("pathParameters");

        try {
            TestAnswer test = new TablesMapperAnswers().getTestAnswer(pathParameters.get("id"));
            if(test == null)
                return ApiResponseHandler.createResponse("nothing was found.", 200);
            return ApiResponseHandler.createResponse(test, 200);
        } catch (Exception  e) {
            logger.error("Error in getting Answers: " + e);
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
