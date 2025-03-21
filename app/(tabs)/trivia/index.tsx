import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTriviaStore } from '@/contexts/api/trivia';
import { useTheme } from 'react-native-paper';
import TriviaFilter from '@/components/trivia/triviaFilter';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Trivia() {
  const { colors } = useTheme();
  const { questions, fetchQuestions } = useTriviaStore();
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleFetchQuestions = async (difficulty: string, category: number) => {
    setLoading(true);
    await fetchQuestions(difficulty, category, 10);
    setLoading(false);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setScore(0);
  };

  const handleAnswerSelection = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);

    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {!quizStarted ? (
        <TriviaFilter onFilterApply={handleFetchQuestions} />
      ) : loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : showResults ? (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>Your Score: {score} / {questions.length}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={() => setQuizStarted(false)}>
            <Text style={styles.restartText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.questionContainer}>
          <Text style={styles.questionCount}>Question {currentQuestionIndex + 1} of {questions.length}</Text>
          <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>

          {[
            ...questions[currentQuestionIndex].incorrect_answers,
            questions[currentQuestionIndex].correct_answer,
          ]
            .sort(() => Math.random() - 0.5)
            .map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === option
                    ? option === questions[currentQuestionIndex].correct_answer
                      ? styles.correctAnswer
                      : styles.wrongAnswer
                    : null,
                ]}
                onPress={() => handleAnswerSelection(option)}
                disabled={!!selectedAnswer}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: wp(5), justifyContent: 'center' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  questionContainer: { alignItems: 'center', paddingVertical: wp(5) },
  questionCount: { fontSize: 18, fontWeight: 'bold', color: '#666' },
  questionText: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: wp(4) },
  optionButton: {
    width: '90%',
    paddingVertical: wp(3),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    marginVertical: wp(2),
    elevation: 3,
  },
  optionText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  correctAnswer: { backgroundColor: '#4CAF50' },
  wrongAnswer: { backgroundColor: '#FF3D00' },
  resultsContainer: { alignItems: 'center' },
  resultsText: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: wp(4) },
  scoreText: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: wp(4) },
  restartButton: {
    backgroundColor: '#007AFF',
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
    borderRadius: 12,
    elevation: 3,
  },
  restartText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
});
