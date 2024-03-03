import type { FilloutQuestion, FilterClauseType } from './interfaces.js';

function matches(question: FilloutQuestion, clause: FilterClauseType) {
    let decision = false;
    if (question.id === clause.id) {
        switch (clause.condition) {
            case "does_not_equal":
                decision = question.value !== clause.value;
                break;
            case "equals":
                decision = question.value === clause.value;
                break;
            case "greater_than":
                decision = question.value > clause.value;
                break;
            case "less_than":
                decision = question.value < clause.value;
                break;
        }
    }
}

/**
 * Efforts can be taken to further optimize this function
 * @param questions 
 * @param filter 
 */
export function filterQuestions(
    questions: FilloutQuestion[],
    clauses: FilterClauseType[],
): FilloutQuestion[] {
    return questions.filter((question) => {
        return clauses.every((clause) => {
            return clause.id !== question.id || matches(question, clause);
        })
    })
}
