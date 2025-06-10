import IdeasApi from '../services/ideasApi';

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];
    this.getIdeas();
    this._validTags = new Set();
    this._validTags.add('technology');
    this._validTags.add('software');
    this._validTags.add('business');
    this._validTags.add('education');
    this._validTags.add('health');
    this._validTags.add('inventions');
  }

  addEventListeners() {
    this._ideaListEl.addEventListener('click', (e) => {
      
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        console.log(ideaId);
        this.deleteIdea(ideaId);
      }

      if(e.target.classList.contains('view-more-btn')) {
        const card = e.target.closest('.card')
        const preview = card.querySelector('.preview')
        const fullDescription = card.querySelector('.full-description')
        const button = e.target
  
        if(fullDescription.style.display === 'none'){ 
          preview.style.display = 'none'
          fullDescription.style.display = 'block'
          button.textContent = 'Show Less'
        } else {
          preview.style.display = 'block'
          fullDescription.style.display = 'none'
          button.textContent = 'View More'
        }
      }
    });
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
      console.log(this._ideas);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      //delete frpm server
      const res = await IdeasApi.deleteIdea(ideaId);
      this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert('You can not delete the resource!');
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = '';
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = '';
    }
    return tagClass;
  }

  render() {
    if (this._ideas.length === 0) {
      this._ideaListEl.innerHTML = `
         <div class="card">
          <h3>Waiting for ideas...</h3>
          <p>No ideas yet! Click the + button to add one.</p>
        </div>
      `;
      return;
    }

    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const previewDescription = idea.description ? idea.description.substring(0, 100) + '...' : '';
        return `
        <div class="card" data-id="${idea._id}">
          <button class="delete"><i class="fas fa-times"></i></button>
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
          <div class="description">
            <p class ="preview>${previewDescription}</p>
            <div class = "full-description" style="display: none;">${idea.description}</div>
            ${idea.description ? `<button class="read-more">Read More</button>` : ''}
          </div>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
        `;
      })
      .join('');
    this.addEventListeners();
  }
}

export default IdeaList;
