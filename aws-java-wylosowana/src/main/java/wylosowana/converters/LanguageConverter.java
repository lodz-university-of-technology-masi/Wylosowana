package wylosowana.converters;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import wylosowana.model.Language;

public class LanguageConverter implements DynamoDBTypeConverter<String, Language> {
    private final Logger logger = LogManager.getLogger(this.getClass());
    @Override
    public String convert(Language language) {
        return language.getLabel() + "," + language.getValue();
    }

    @Override
    public Language unconvert(String s) {
        logger.error("UnconvertString: " + s);
        String[] r = s.split(",");
        return new Language(r[0], r[1]);
    }
}
