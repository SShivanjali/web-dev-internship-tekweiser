import pandas as pd 
from sklearn.model_selection import train_test_split 
from datasets import Dataset, ClassLabel 
import evaluate 
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification, Trainer, TrainingArguments 
import numpy as np 
 
# Load CSV dataset 
df = pd.read_csv('data/emails_modified.csv')  # Make sure your csv is here 
 
# Inspect categories 
print("Categories and counts:") 
print(df['label'].value_counts())    
 
# Define all possible categories (in case some are missing from your dataset)
all_categories = [
    'Coding Contest',
    'Tech News', 
    'Dev Notifications',
    'Job Alert',
    'Hackathon/Event',
    'Government',
    'Banking',
    'E-commerce',
    'Complaint',
    'Bug Report',
    'Query',
    'Technical Support',
    'Payment',
    'Socials',
    'Security',
    'Order Status'
]

# Get unique categories from the dataset
categories = df['label'].unique().tolist()
print(f"\nCategories found in dataset: {categories}")

# Map categories to IDs 
category_to_id = {cat: i for i, cat in enumerate(categories)} 
df['label_id'] = df['label'].map(category_to_id) 
 
# Combine subject and body for input text
df['text'] = df['subject'].fillna('') + " " + df['body'].fillna('') 
 
# Split data (train/test) 
train_df, test_df = train_test_split(df, test_size=0.1, stratify=df['label_id'], random_state=42) 
 
# Convert to HuggingFace Dataset 
train_ds = Dataset.from_pandas(train_df[['text', 'label_id']]) 
test_ds = Dataset.from_pandas(test_df[['text', 'label_id']]) 

# Rename label_id column to label for consistency with transformers
train_ds = train_ds.rename_column('label_id', 'label')
test_ds = test_ds.rename_column('label_id', 'label')
 
# Define class labels 
class_labels = ClassLabel(num_classes=len(categories), names=categories) 
train_ds = train_ds.cast_column('label', class_labels) 
test_ds = test_ds.cast_column('label', class_labels) 
 
# Load tokenizer 
tokenizer = DistilBertTokenizerFast.from_pretrained('distilbert-base-uncased') 
 
# Tokenize function 
def tokenize(batch): 
    return tokenizer(batch['text'], padding='max_length', truncation=True, max_length=512) 
 
train_ds = train_ds.map(tokenize, batched=True) 
test_ds = test_ds.map(tokenize, batched=True) 
 
# Set dataset format to PyTorch tensors 
train_ds.set_format('torch', columns=['input_ids', 'attention_mask', 'label']) 
test_ds.set_format('torch', columns=['input_ids', 'attention_mask', 'label']) 
 
# Load pre-trained DistilBERT model for sequence classification 
model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=len(categories)) 
 
# Define training arguments 
training_args = TrainingArguments( 
    output_dir='./results', 
    num_train_epochs=3, 
    per_device_train_batch_size=16, 
    per_device_eval_batch_size=64, 
    eval_strategy='epoch',
    save_strategy='epoch', 
    logging_dir='./logs', 
    logging_steps=10, 
    load_best_model_at_end=True, 
    metric_for_best_model='accuracy', 
    greater_is_better=True,
) 
 
# Load accuracy metric 
metric = evaluate.load('accuracy') 
 
def compute_metrics(eval_pred): 
    logits, labels = eval_pred 
    preds = np.argmax(logits, axis=-1) 
    return metric.compute(predictions=preds, references=labels) 
 
# Initialize Trainer 
trainer = Trainer( 
    model=model, 
    args=training_args, 
    train_dataset=train_ds, 
    eval_dataset=test_ds, 
    compute_metrics=compute_metrics, 
) 
 
# Train the model 
print("Starting training...") 
trainer.train() 
 
# Evaluate the model 
print("Evaluating model...") 
eval_result = trainer.evaluate() 
print(f"Validation accuracy: {eval_result['eval_accuracy']:.4f}") 
 
# Save the fine-tuned model and tokenizer 
model.save_pretrained('./email_classifier_model') 
tokenizer.save_pretrained('./email_classifier_model') 
print("Model and tokenizer saved to './email_classifier_model'") 
 
# Print category mapping for reference 
print("\nCategory mapping:") 
for cat, idx in category_to_id.items(): 
    print(f"{idx}: {cat}")

# Save category mapping for later use
import json
with open('./email_classifier_model/category_mapping.json', 'w') as f:
    json.dump(category_to_id, f, indent=2)
print("Category mapping saved to './email_classifier_model/category_mapping.json'")