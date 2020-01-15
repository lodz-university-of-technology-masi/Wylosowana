package wylosowana.OwnLambda.Answers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.serverless.ApiGatewayResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import wylosowana.mappers.TablesMapperAnswers;
import wylosowana.model.TestAnswers.TestAnswer;
import wylosowana.responses.ApiResponseHandler;

import java.util.List;
import java.util.Map;

public class ReadAllAnswers implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    private final Logger logger = LogManager.getLogger(this.getClass());

    // getSolvedTests -> all params are returned.
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> stringObjectMap, Context context) {
        try {
            List<TestAnswer> tests= new TablesMapperAnswers().getAllTestAnswers();
            return ApiResponseHandler.createResponse(tests, 200);
        } catch (Exception  e) {
            logger.error("Error in getting Answers: " + e);
            return ApiResponseHandler.createResponse("cannot connect to database.", 401);
        }
    }
}
