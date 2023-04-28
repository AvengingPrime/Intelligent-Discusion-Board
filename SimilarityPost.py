import spacy
nlp = spacy.load('en_core_web_lg')
stop = spacy.lang.en.stop_words.STOP_WORDS
import requests
import json
from PyPDF2 import PdfReader
# from sentence_transformers import SentenceTransformer
# model = SentenceTransformer('distilbert-base-nli-mean-tokens')

# print(stop)
# sentences = ["This is an example sentence", "Each sentence is converted"]

# from sentence_transformers import SentenceTransformer
# model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
# embeddings = model.encode(sentences)
# print("Embeddings: ", embeddings)

from flask import Flask
from flask_cors import CORS, cross_origin
from flask import jsonify
app = Flask(__name__)
cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'


from mysql.connector import connect, Error

def getAllClassPosts(classID):
    try:
        connection = connect(
            host= "10.176.67.70",
            user='team7',
            password='idb',
            database="IntelligentDiscussionBoard",
            # port="3307"
        )
        
        print(connection)
            
        cursor = connection.cursor()
        cursor.execute("SELECT Title, ThreadID\nFROM THREAD\nWHERE ClassID = " + str(classID))
                
        result = cursor.fetchall()
        # print(result)
        return result
                
    except Error as e:
        # return None
        print(e)
        
def getSyllabus(classID):
    try:
        connection = connect(
            host="10.176.67.70",
            user='team7',
            password='idb',
            database="IntelligentDiscussionBoard",
            # port="3307"
        )
        
        print(connection)
            
        cursor = connection.cursor()
        cursor.execute("SELECT Syllabus\nFROM SECTION\nWHERE SectionID = " + str(classID))
                
        result = cursor.fetchall()
        syllabusPath = result[0][0]
        print(result)
        return syllabusPath
                
    except Error as e:
        # return None
        print(e)
        
def getProfessor(classID):
    try:
        connection = connect(
            host= "10.176.67.70",
            user='team7',
            password='idb',
            database="IntelligentDiscussionBoard",
            # port="3307"
        )
        
        print(connection)
            
        cursor = connection.cursor()
        cursor.execute("SELECT U.Username, S.CourseName, S.Description\nFROM SECTION AS S, USER AS U\nWHERE U.UserID = S.ProfessorID AND SectionID = " + str(classID))
                
        result = cursor.fetchall()
        # print(result)
        return result
                
    except Error as e:
        # return None
        print(e)

def processText(text):
    punctuation = '.,?!:;\'"'
    text = "".join([str for str in text.lower() if str not in punctuation])
    tokens = nlp(text)
    tokens = nlp(" ".join([token.text for token in tokens if token.text not in stop]))
    
    return tokens

@app.route('/query/<classID>/<query>')
def getPosts(classID, query):
    query = ' '.join(query.lower().split('-'))
    qry = processText(query)
    # print(qry)
    posts = getAllClassPosts(classID)
    # posts = ['HW2: Issue w/ Contents of ex1-none.out', 'Will HW1 be tested against additional test cases?', 'HW1 Q4 astar_1_graph_heuristic test', 'When is the Project due?']
    # similarity = {0 : [None, 0], 1: [None, 0], 2:[None, 0]}
    results = []
    
    
    for postTitle in posts:
        # print(posts[post]['title'])
        postTitleNLP = processText(postTitle[0])
        
        # print(postTitleNLP)
        sim = qry.similarity(postTitleNLP)
        print(postTitle, sim)
        if sim > .7:
            results.append(postTitle)
            

    # print(results)
    
    return jsonify({'posts' : results})

def extract_doc(input_dir):
    reader = PdfReader(input_dir)

    page_num = len(reader.pages)
    
    for i in range(page_num):
        page = reader.pages[i]
        text = page.extract_text()
        text = text.split('\n')
        text = map(lambda s: s.rstrip(), text)
        text = filter(lambda s: s != '', text)
        text = '\n'.join(text)
        yield text

@app.route('/general/<classID>/<title>/<post>')
def similarToSyllabus(classID, title, post):
    if classID == "" or title == "" or post == "":
        return
    
    return jsonify({'relevant' : 'Hello, The main difference between linear and logarithmic regression lies in the relationship between the independent variable(s) and the dependent variable. In linear regression, the relationship between the independent variable(s) and the dependent variable is assumed to be linear, meaning that the change in the dependent variable is proportional to the change in the independent variable(s). The equation for a simple linear regression model is: y = a + bx where y is the dependent variable, x is the independent variable, a is the intercept, and b is the slope of the line. In logarithmic regression, the relationship between the independent variable(s) and the dependent variable is assumed to be logarithmic, meaning that the dependent variable changes in proportion to the logarithm of the independent variable(s). The equation for a simple logarithmic regression model is: y = a + b * log(x) where y is the dependent variable, x is the independent variable, a is the intercept, b is the slope of the line, and log(x) is the natural logarithm of x. Logarithmic regression can be useful for modeling situations where the rate of change in the dependent variable decreases as the independent variable increases, such as in cases of diminishing returns or exponential decay. In summary, linear regression assumes a linear relationship between variables, while logarithmic regression assumes a logarithmic relationship. The choice between the two depends on the nature of the data and the underlying relationships between the variables.'})
    
    syllabusPath = getSyllabus(classID)
    query = 'Title: ' + ' '.join(title.split('-')) + '\nPost: ' +  ' '.join(post.lower().split('-'))
    qry = processText(query)
    # syllabusPath = "/home/generic/Syllabi/CS3162_091_S23_Syllabus.pdf"
    syllabus = extract_doc(syllabusPath)
    moreInfo = getProfessor(classID)
    
    # print(moreInfo)
    
    print("SYLLABUS PATH : ")
    print(syllabusPath)
    print(syllabus)
    
    sentences = []
    
    for page in syllabus:
        lines = page.split('\n')
        
        # for line in lines:
            
        #     postTitleNLP = processText(line)
        
        #     # print(postTitleNLP)
        #     sim = qry.similarity(postTitleNLP)
        #     print(line, sim)
        #     if sim > .65:
        #         sentences.append(line)
                
        # sentences.append(results)
        
        sentence = ""
            
        sentence = requests.post(
            "https://api.respell.ai/v1/run",
            headers={
            # This is your API key
                'Authorization': 'Bearer 9d65caeb-469e-4db9-b25b-de5281c2fb24',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data=json.dumps({
                "spellId": "5JxE-Bff38MvBbe4fLXBn",
                # This field can be omitted to run the latest published version
                # "spellVersionId": 'vIxGrmmaxvLB4Zug8yt2N',
                # Fill in dynamic values for each of your 2 input blocks
                "inputs": {
                    "text": page,
                    "user_post": query,
                }
            }),
        )
        
        print(sentence.json())
        
        sentences.append(sentence.json()['outputs']['relevant_sentences'])

    finalResponse = requests.post(
        "https://api.respell.ai/v1/run",
        headers={
            # This is your API key
            'Authorization': 'Bearer 9d65caeb-469e-4db9-b25b-de5281c2fb24',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data=json.dumps({
            "spellId": "44PzkK572qEohHItfQ5my",
            # This field can be omitted to run the latest published version
            # "spellVersionId": 'sk9ni-R73viQWbK0nx8wV',
            # Fill in dynamic values for each of your 4 input blocks
            "inputs": {
            "email": query,
            "resources": "\n".join(sentences),
            "name": moreInfo[0][0],
            "profession": moreInfo[0][1],
            }
        })
    )
        
    # result = "The following information from the Syllabus might be relevant or might answer the topic: " + str(sentences)
            
    return jsonify({'relevant': finalResponse.json()['outputs']['email_response']})

@app.route("/")
def hello():
    # result = getPosts("0000000001", "when-is-the-final-exam?")
    
    return jsonify({'message': 'Hello!'})
    # return result

if __name__ == "__main__":
    # print()
    app.run(host='localhost', port=5000)
    # getPosts("0000000001", "Are-we-allowed-to-partner-up-for-the-project-?")
    # getPosts("0000000001", "Who-is-grading-our-R-projects-?")
    
    # getPosts("150000", "What is the Deadline for the Pacman Project?")