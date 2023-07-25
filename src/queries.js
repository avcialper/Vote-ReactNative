import { gql } from "@apollo/client";

export const NEW_ANSWER_MUTATION = gql`
    mutation NewAnswerMutation($option_id: Int!, $user_id: String!, $question_id: Int!) {
        insert_answers_one(object: {option_id: $option_id, user_id: $user_id, question_id: $question_id}) {
            id
        }
    }  
`

export const GET_QUERY_SUBSCRIPTION = gql`
    subscription{
        questions(order_by: {created_at: desc}){
            id
            text
            user_id
        }
    }
`

export const ADD_NEW_QUESTION_MUTATION = gql`
   mutation AddNewQuestionMutation($options: [options_insert_input!]!, $title: String!, $user_id: String!) {
        insert_questions_one(object: { text: $title, user_id: $user_id, questions_options: { data: $options } }) {
            id
            text
        }
    }   
`

export const GET_QUESTIONS_DETAIL = gql`
    query DetailQuery($id: Int!, $user_id: String!) {
        questions_by_pk(id: $id) {
            id
            text
            questions_options {
                id
                text
            }
            questions_answers(limit: 1, where: {user_id: {_eq: $user_id}}) {
                id
                user_id
            }
        }
    } 
`

export const RESULT_SUBSCRIPTION = gql`
    subscription GetAnswersCount($id: Int!) {
        questions_by_pk(id: $id) {
            questions_options {
                id
                text
                answer_aggregate {
                    aggregate {
                        count
                    }
                }
            }
        }
    }  
`

export const DELETE_QUESTION_MUTATION = gql`
    mutation DeleteQuestion($id: Int!) {
        delete_questions_by_pk(id: $id) {
            id
        }
    }
`