// HTML elementlərini dəyişənlərə təyin edirik
const userInput = document.getElementById('userInput');
const submitBtn = document.getElementById('submitBtn');
const responseContainer = document.getElementById('responseContainer');
const loader = document.getElementById('loader');

// Düyməyə basılanda nə baş verəcəyini müəyyən edirik
submitBtn.addEventListener('click', async () => {
    // İstifadəçinin yazdığı mətni götürürük
    const prompt = userInput.value;

    // Əgər heç nə yazmayıbsa, funksiyanı dayandırırıq
    if (!prompt) {
        alert('Zəhmət olmasa, bir fikir və ya sual daxil edin.');
        return;
    }

    // Cavab gələnə qədər gözləmə animasiyasını göstəririk
    loader.style.display = 'block';
    responseContainer.innerText = ''; // Köhnə cavabı təmizləyirik
    submitBtn.disabled = true; // Düyməni müvəqqəti söndürürük

    try {
        // Bizim Netlify-dakı arxa plan funksiyamıza sorğu göndəririk
        const response = await fetch('/.netlify/functions/ask-prisma', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        });

         if (!response.ok) {
            throw new Error(`Server xətası: ${response.status}`);
        }

        const data = await response.json();
        responseContainer.innerText = data.response;

    } catch (error) {
        // Hər hansı bir xəta baş verərsə, onu göstəririk
        console.error('Xəta baş verdi:', error);
        responseContainer.innerText = 'Bir xəta baş verdi. Zəhmət olmasa, yenidən cəhd edin.';
    } finally {
        // Hər şey bitdikdən sonra gözləmə animasiyasını gizlədirik
        loader.style.display = 'none';
        submitBtn.disabled = false; // Düyməni yenidən aktivləşdiririk
    }
});