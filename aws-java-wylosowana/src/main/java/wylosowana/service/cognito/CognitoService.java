package wylosowana.service.cognito;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.ListUsersInGroupRequest;
import com.amazonaws.services.cognitoidp.model.ListUsersInGroupResult;
import com.amazonaws.services.cognitoidp.model.ListUsersRequest;
import com.amazonaws.services.cognitoidp.model.ListUsersResult;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import wylosowana.creators.ParticipantCreator;
import wylosowana.identificators.IdentyficatorsController;
import wylosowana.model.Participant;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CognitoService {
    private static final Logger LOG = LogManager.getLogger(CognitoService.class);
    private AWSCognitoIdentityProvider identityProvider = AWSCognitoIdentityProviderClientBuilder.defaultClient();


    public List<Participant> getCognitoUsers(){
        ListUsersResult users = identityProvider.listUsers(new ListUsersRequest().withUserPoolId(IdentyficatorsController.USER_POOL_ID));
        return users.getUsers().stream().map(ParticipantCreator::CreateParticipant)
                .collect(Collectors.toList());
    }



    public Participant getCognitoUser(String id){
        List<Participant> participants = getCognitoUsers();
        Participant answer = null;
        for(Participant participant : participants){
            if(participant.getId().equals(id))
                answer = participant;
        }
        return answer;
    }


    public List<Participant> getParticipantsWithProfile(String profile){
        ListUsersInGroupResult users = identityProvider.listUsersInGroup(new ListUsersInGroupRequest().withGroupName(profile));
        return users.getUsers().stream().map(ParticipantCreator::CreateParticipant)
                .collect(Collectors.toList());
    }

}
