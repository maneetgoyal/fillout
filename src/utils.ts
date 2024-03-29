import type {
  FilloutQuestion,
  FilloutResponse,
  FilterClauseType,
} from './interfaces.js';

function matches(question: FilloutQuestion, clause: FilterClauseType): boolean {
  let decision = false;
  if (question.id === clause.id) {
    switch (clause.condition) {
      case 'does_not_equal':
        decision = question.value !== clause.value;
        break;
      case 'equals':
        decision = question.value === clause.value;
        break;
      case 'greater_than':
        decision = question.value > clause.value;
        break;
      case 'less_than':
        decision = question.value < clause.value;
        break;
    }
  }
  return decision;
}

/**
 * Efforts can be taken to further optimize this function
 * @param questions
 * @param filter
 */
export function filterResponse(
  response: FilloutResponse,
  clauses: FilterClauseType[],
): boolean {
  return clauses.every((clause) => {
    return response.questions.some((question) => {
      return matches(question, clause);
    });
  });
}
