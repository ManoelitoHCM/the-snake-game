import { db } from './FirebaseConfig'; // Ajuste o caminho conforme necessário
import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore";

class ScoreService {
    async saveScore(playerName: string, score: number): Promise<void> {
        try {
            const docRef = await addDoc(collection(db, 'scores'), {
                name: playerName,
                score: score,
                timestamp: new Date().toISOString()
            });
            console.log(`Documento salvo com ID: ${docRef.id}`);
        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
        }
    }

    async getScores(): Promise<{ name: string, score: number }[]> {
        try {
            const scoresRef = collection(db, 'scores');
            const scoresQuery = query(scoresRef, orderBy('score', 'desc'));
            const querySnapshot = await getDocs(scoresQuery);
            const scores: { name: string, score: number }[] = [];

            querySnapshot.forEach((doc) => {
                scores.push({
                    name: doc.data().name,
                    score: doc.data().score,
                });
            });

            return scores;
        } catch (e) {
            console.error("Erro ao buscar os scores: ", e);
            return [];
        }
    }
}

export default ScoreService;