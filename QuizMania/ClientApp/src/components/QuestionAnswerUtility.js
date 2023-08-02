 

export const QuestionAnswerUtility = () => {


    const GetAnswerCount = (questions) => {

        var count = 0;
        for (var q = 0; q < questions.length; q++) {
            for (var a = 0; a < questions[q].answers.length; a++) {
                count++;
            }
        }
        return count;
    }

    return {
        GetAnswerCount: GetAnswerCount
    }

}