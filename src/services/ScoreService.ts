import { db } from './FirebaseConfig'; // Ajuste o caminho conforme necessário
import { collection, getDocs, setDoc, doc, query, orderBy, limit } from "firebase/firestore";

class ScoreService {
    async saveScore(playerName: string, score: number): Promise<void> {
        try {
            // Verificar se o nome tem no máximo 20 caracteres e é alfanumérico
            if (!/^[a-zA-Z0-9]+$/.test(playerName) || playerName.length > 20) {
                throw new Error("O nome do jogador deve ter no máximo 20 caracteres e ser alfanumérico.");
            }

            // Gerar um ID baseado no nome do jogador (por exemplo, "player-<nome>")
            const playerId = `player-${playerName.replace(/\s+/g, '_').toLowerCase()}`;

            // Definir o documento com o ID específico
            await setDoc(doc(db, 'scores', playerId), {
                name: playerName,
                score: score,
                timestamp: new Date().toISOString()
            });

            console.log(`Score salvo com ID: ${playerId}`);
        } catch (e) {
            console.error("Erro ao adicionar ou atualizar documento: ", e);
        }
    }

    async getScores(): Promise<{ name: string, score: number }[]> {
        try {
            const scoresRef = collection(db, 'scores');
            const scoresQuery = query(scoresRef, orderBy('score', 'desc'), limit(10));
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
