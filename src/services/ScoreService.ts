// Importar o db do arquivo de configuração
import db from './FirebaseConfig';

export default class ScoreService {
    constructor() { }

    async saveScore(name: string, score: number): Promise<void> {
        try {
            // Adicionar um documento com ID automático
            const docRef = await db.collection('players').add({
                name: name,
                score: score,
            });
            console.log(`Score de ${name} com ${score} pontos salvo com sucesso! ID: ${docRef.id}`);
        } catch (error) {
            console.error('Erro ao salvar o score no Firestore:', error);
        }
    }

    async getTopScores(limit: number = 5): Promise<void> {
        try {
            const scoresRef = db.collection('players');
            const querySnapshot = await scoresRef.orderBy('score', 'desc').limit(limit).get();

            querySnapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
            });
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
        }
    }
}
