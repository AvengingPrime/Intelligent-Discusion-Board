import spacy
nlp = spacy.load('en_core_web_lg')
from flask import Flask
from flask import jsonify
app = Flask(__name__)

from mysql.connector import connect, Error

def getAllClassPosts(classID):
    try:
        with connect(
            host="csa-4485-01.utdallas.edu",
            user='root',
            password='',
            database="IntelligentDiscussionBoard",
            # port="3307"
        ) as connection:
            print(connection)
            
            with connection.cursor() as cursor:
                cursor.execute("SELECT Title\nFROM THREAD\nWHERE ClassID = " + str(classID))
                
            result = cursor.fetchall()
            return result
                
    except Error as e:
        # return None
        print(e)


@app.route('/query/<classID>/<query>')
def getPosts(classID, query):
    print("Hello")
    query = ' '.join(query.split('-'))
    posts = getAllClassPosts(classID)
    # posts = ['HW2: Issue w/ Contents of ex1-none.out', 'Will HW1 be tested against additional test cases?', 'HW1 Q4 astar_1_graph_heuristic test', 'When is the Project due?']
    qry = nlp(query)
    # similarity = {0 : [None, 0], 1: [None, 0], 2:[None, 0]}
    results = []
    
    for postTitle in posts:
        # print(posts[post]['title'])
        postTitleNLP = nlp(postTitle)
        sim = qry.similarity(postTitleNLP)
        
        if sim > .7:
            results += postTitle
            

    print("".join(results))
    
    return jsonify({'posts' : results})
        
@app.route("/")
def hello():
    return jsonify({'message': 'Hello!'})

if __name__ == "__main__":
    # print()
    app.run(host='localhost', port=5000)
    # getPosts("150000", "What is the Deadline for the Pacman Project?")
