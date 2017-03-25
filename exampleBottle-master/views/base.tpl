% # basic template for a title and text, require content-dictionary:
% # {... title: 'text-title', text: 'body-text'}

% include('header.tpl')
  <div id="main">
    <h2>{{contdict['title']}}</h2>
    {{contdict['text']}}
  </div>
% include('footer.tpl')
